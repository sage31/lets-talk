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
        ])
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
      // If Enter key is pressed, simulate a click on the button
      getChatBotResponse({
        name: "you",
        role: "user",
        content: inputMessage,
      });
    }
  };

  const getMobileOperatingSystem = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "windows";
    } else if (/android/i.test(userAgent)) {
      return "android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "ios";
    } else {
      return "unknown";
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const input = document.querySelector("input");
    const inputColor = "white";
    const backgroundColor = "black";

    if (input) {
      if (getMobileOperatingSystem() === "ios") {
        input.addEventListener(
          "focus",
          () => {
            document.body.style.backgroundColor = inputColor;
          },
          false
        );

        input.addEventListener(
          "focusout",
          () => {
            document.body.style.backgroundColor = backgroundColor;
          },
          false
        );
      }
    }
  });

  return (
    <div className="w-[98%] left-[2%] h-[60%] laptop:w-[59%] mx-auto laptop:h-[55%] absolute laptop:left-[20.5%] top-1/4">
      <div className="laptop:mt-10 h-full container overflow-y-auto pr-3 flex flex-col-reverse">
        <ul className="flex flex-col">
          <li className="text-center mb-3 max-sm:ml-3">
            <div className="text-4xl laptop:text-5xl font-bold mt-20 laptop:mt-20">
              Let's talk.
            </div>
            <div className="text-sm font-bold mt-2 mb-40 laptop:mb-24">
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
      <div className="fixed-container">
        <div className="relative-container">
          <form action="">
            <input
              type="text"
              className="text-black rounded-full w-[80%] ml-2 laptop:w-[85%] mt-10 pl-3"
              placeholder="What are your career plans?"
              onChange={(event) => {
                setInputMessage(event.target.value);
              }}
              value={inputMessage}
              onKeyDown={handleKeyPress}
            />
            <button
              id="sender"
              className="ml-3 mb-3 send "
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
          </form>
        </div>
      </div>
    </div>
  );
}
