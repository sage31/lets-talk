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
    const url = "http://127.0.0.1:4444/getResponse";
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
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }
      partial += decoder.decode(value);
      const lines = partial.split("\n");
      partial = lines.pop();
      for (const line of lines) {
        //console.log(line);
        partial += line;
        update(partial);
      }
    }
    if (partial) {
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
    <div className="w-1/2 ">
      <div className="mt-10 h-[400px] container overflow-y-auto pr-3">
        <ul>
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
        className="text-black inline rounded-full w-[45%] mt-10 pl-3"
        placeholder="What are your career plans?"
        onChange={(event) => {
          setInputMessage(event.target.value);
        }}
        value={inputMessage}
        onKeyDown={handleKeyPress}
      />
      <button
        id="sender"
        className="ml-2 inline"
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
