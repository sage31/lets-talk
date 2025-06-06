import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const invalidUtfChar = 0xff; // Invalid UTF-8 character.
const bigInvalidBytes = Buffer.alloc(1024 * 50, invalidUtfChar); // 50KB, helps flush stream faster.

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, _context) => {
    try {
      let message = JSON.parse(event.body).message;
      let threadId = event.headers["thread-id"];
      if (!threadId) {
        const thread = await openai.beta.threads.create({
          messages: [message],
        });
        threadId = thread.id;
      }

      await openai.beta.threads.messages.create(threadId, message);

      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID,
        stream: true,
      });

      const metadata = {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain",
          "Thread-Id": threadId,
        },
      };

      const stream = awslambda.HttpResponseStream.from(
        responseStream,
        metadata
      );

      for await (const runObject of run) {
        switch (runObject.event) {
          case "thread.message.delta":
            let chunk = runObject.data;
            let content = chunk.delta.content;
            stream.write(content.map((c) => c.text && c.text?.value).join(""));
            stream.write(bigInvalidBytes);
            break;
          case "thread.message.completed":
            stream.end();
            break;
          case "thread.run.failed":
          case "thread.run.cancelling":
          case "thread.run.cancelled":
          case "thread.run.expired":
          case "thread.run.incomplete":
          case "thread.message.incomplete":
            console.error("INTERNAL ERROR: Thread failed", runObject.data);
            stream.end();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("INTERNAL ERROR: ", error);
      const metadata = {
        statusCode: 500,
        headers: {
          "Content-Type": "text/plain",
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
