import { useState } from "react";
import Message from "./Message";
export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      name: "Stevie Dean (AI)",
      role: "assistant",
      profileImgSrc: "./images/me.jpg",
      content: "Ask me anything!",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  function getChatBotResponse(message) {
    setInputMessage("");
    let tmpMessages = messages.concat([message]);
    setMessages(tmpMessages);
    getStreamedResponse(message, (value) => {
      setMessages(
        tmpMessages.concat([
          {
            name: "Stevie Dean (AI)",
            role: "assistant",
            profileImgSrc: "./images/me.jpg",
            content: value,
          },
        ]),
      );
    });
  }

  async function getStreamedResponse(message, update) {
    const url =
      "https://3p6ynoc4j3yrxcqppkgkujdaoy0vkacn.lambda-url.us-west-1.on.aws/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        messages: JSON.stringify([...messages, message]),
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let partial = "";
    let done = false;
    let value;
    while (!done) {
      ({ done, value } = await reader.read());
      partial += decoder.decode(value).replaceAll("~", "");
      update(partial);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getChatBotResponse({
        name: "you",
        role: "user",
        content: inputMessage,
      });
    }
  };

  return (
    <div className="absolute bottom-[6%] left-[2%] mx-auto h-[70%] w-[98%] laptop:bottom-[14%] laptop:left-[20.5%] laptop:h-[62%] laptop:w-[59%]">
      <div className="container flex h-[calc(100%-20px)] flex-col-reverse overflow-y-auto pr-3 laptop:mt-10">
        <ul className="flex flex-col">
          <li className="mb-3 text-center max-sm:ml-3">
            <div className="mt-20 text-4xl font-bold laptop:mt-20 laptop:text-5xl">
              Let's talk.
            </div>
            <div className="mb-20 mt-2 text-sm font-bold laptop:mb-24">
              Additional questions? Email stephenwdean@gmail.com
            </div>
          </li>

          {messages.map((message, index) => (
            <li
              key={index}
              className={message.role === "user" ? "self-end" : ""}
            >
              <Message messageData={message} />
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed-container w-full">
        <div className="relative-container w-full">
          <input
            type="text"
            className="ml-2 mt-10 w-[80%] rounded-full pl-3 text-black laptop:w-[52%]"
            placeholder="What are your career plans?"
            onChange={(event) => {
              setInputMessage(event.target.value);
            }}
            value={inputMessage}
            onKeyDown={handleKeyPress}
          />
          <button
            id="sender"
            className="send ml-3 "
            onClick={() =>
              getChatBotResponse({
                name: "you",
                role: "user",
                content: inputMessage,
              })
            }
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
