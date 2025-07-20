import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = fs.readFileSync("./system_prompt.txt", "utf-8");
const invalidUtfChar = 0xff;
const bigInvalidBytes = Buffer.alloc(1024 * 50, invalidUtfChar); // Helps flush stream

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, _context) => {
    try {
      const { message } = JSON.parse(event.body);
      const previousResponseId = event.headers["response-id"];

      const input = previousResponseId
        ? [message]
        : [{ role: "system", content: systemPrompt }, message];

      const responseStreamApi = await openai.responses.create({
        model: "gpt-4.1-mini",
        previous_response_id: previousResponseId || undefined,
        stream: true,
        input,
      });

      let responseId = null;
      let stream;

      for await (const responseStreamEvent of responseStreamApi) {
        switch (responseStreamEvent.type) {
          case "response.created":
            responseId = responseStreamEvent.response.id;
            const metadata = {
              statusCode: 200,
              headers: {
                "content-type": "text/plain",
                "response-id": responseId,
              },
            };
            stream = awslambda.HttpResponseStream.from(responseStream, metadata);
            break;
          case "response.output_text.delta":
            if (!stream) {
              throw new Error("Stream not initialized before delta event");
            }
            stream.write(responseStreamEvent.delta);
            stream.write(bigInvalidBytes);
            break;
          case "response.output_text.done":
            stream.end();
            break;
          case "error":
            throw new Error(
              `Response failed: ${JSON.stringify(responseStreamEvent)}`
            );
        }
      }
    } catch (error) {
      console.error("INTERNAL ERROR: ", error);
      const metadata = {
        statusCode: 500,
        headers: {
          "content-type": "text/plain",
        },
      };
      const errorMessage =
        "Oh no--it seems I'm having difficulties connecting. Please try again later!";
      try {
        const stream = awslambda.HttpResponseStream.from(
          responseStream,
          metadata
        );
        stream.end(errorMessage);
      } catch (ignore) {
        // This is a fallback if the headers have already been sent.
        if (!responseStream.writableEnded) responseStream.end(errorMessage);
        return;
      }
    }
  }
);
