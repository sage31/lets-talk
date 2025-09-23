import OpenAI from "openai";
import fs from "fs";
import systemPrompt from "./system_prompt.txt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const invalidUtfChar = 0xff;
const bigInvalidBytes = Buffer.alloc(1024 * 50, invalidUtfChar); // Helps flush stream

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, _context) => {
    try {
      const { message } = JSON.parse(event.body);
      const previousResponseId = event.headers["response-id"];
      if (message.content.length > 10000) {
        throw new RangeError("Message too long");
      }
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
      let metadata, errorMessage;
      if (error instanceof RangeError) {
        metadata = {
          statusCode: 400,
          headers: {
            "content-type": "text/plain",
          },
        };
        errorMessage = "Sorry, your message is too long. Please shorten it.";
      }
      else {
        console.error("INTERNAL ERROR: ", error);
        metadata = {
          statusCode: 500,
          headers: {
            "content-type": "text/plain",
          },
        };
        errorMessage =
          "It seems I'm having trouble connecting. Please try again later.";
      }
      try {
        const stream = awslambda.HttpResponseStream.from(
          responseStream,
          metadata
        );
        stream.write(errorMessage);
        stream.end();
      } catch (error) {
        console.error("Error sending error response:", error);
        // This is a fallback if the headers have already been sent.
        if (!responseStream.writableEnded) {
          responseStream.write(errorMessage);
          responseStream.end();
        }
        return;
      }
    }
  }
);
