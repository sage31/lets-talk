import { useState } from "react";
import Message from "./Message";
export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      name: "Stevie Dean (AI)",
      role: "assistant",
      profileImgSrc: "/images/me.jpg",
      content: "Ask me anything!",
      isSender: false,
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
            profileImgSrc: "/images/me.jpg",
            content: value,
            isSender: false,
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
        isSender: true,
      });
    }
  };

  return (
    <div className="w-1/2 mx-auto h-[55%] absolute left-1/4 top-1/4">
      <div className="mt-10 h-full container overflow-y-auto pr-3 flex flex-col-reverse">
        <ul>
          <li className="text-center mb-3">
            <div className="text-5xl font-bold mt-32">Let's talk.</div>
            <div className="text-sm font-bold mt-2 mb-32">
              Additional questions? Email stephenwdean@gmail.com
            </div>
          </li>
          {messages.map((message, index) => (
            <li
              key={index}
              className={message.isSender ? "text-right" : "text-left"}
            >
              <Message messageData={message} />
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        className="text-black rounded-full w-[90%] mt-10 pl-3"
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
            isSender: true,
          })
        }
      >
        Send
      </button>
    </div>
  );
}
