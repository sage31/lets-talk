import { useState } from "react";
import Message from "./Message";
import { MessageData } from "./utils";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      name: "Stevie Dean (AI)",
      role: "assistant",
      profileImgSrc: `/lets-talk/images/me.jpg`,
      content: "Ask me anything!",
    },
  ] as MessageData[]);
  const [allowRequests, setAllowRequests] = useState(true);
  const [inputMessage, setInputMessage] = useState("");

  function getChatBotResponse(message: MessageData) {
    if (!allowRequests) return;
    setAllowRequests(false);
    setInputMessage("");
    let tmpMessages = messages.concat([message]);
    let messagesWithLoading = tmpMessages.concat([
      {
        name: "Stevie Dean (AI)",
        role: "assistant",
        profileImgSrc: `/lets-talk/images/me.jpg`,
        content: "",
        isLoading: true,
      },
    ]);
    setMessages(messagesWithLoading);
    getStreamedResponse(message, (content: string) => {
      setMessages(
        tmpMessages.concat([
          {
            name: "Stevie Dean (AI)",
            role: "assistant",
            profileImgSrc: `/lets-talk/images/me.jpg`,
            content,
            isLoading: false,
          },
        ])
      );
    });
  }

  async function getStreamedResponse(
    message: MessageData,
    updateAssistantMessage: (content: string) => void
  ) {
    const url =
      "https://3p6ynoc4j3yrxcqppkgkujdaoy0vkacn.lambda-url.us-west-1.on.aws/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, message],
      }),
    });
    if (!response.body) {
      updateAssistantMessage(
        "\nIt seems I'm having trouble connecting. Please try again later."
      );
      console.error("No response body");
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let partial = "";
    let done = false;
    let value;
    while (!done) {
      ({ done, value } = await reader.read());
      partial += decoder.decode(value).replaceAll("~", "");
      updateAssistantMessage(partial);
    }
    setAllowRequests(true);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getChatBotResponse({
        name: "you",
        role: "user",
        content: inputMessage,
      });
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center overflow-hidden">
      <div className="mt-2 flex w-[96%] flex-1 flex-col-reverse overflow-y-auto pr-3 laptop:mt-5 laptop:w-[59%]">
        <ul className="flex flex-col">
          <li className="mb-[20vh] mt-20 text-center max-sm:ml-3">
            <div className=" text-4xl font-bold laptop:mt-20 laptop:text-5xl">
              Let's talk.
            </div>
            <div className=" mt-2 text-sm font-bold ">
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
      <div className="my-4 flex  w-full laptop:w-[59%]">
        <input
          type="text"
          className="ml-2 flex-1 rounded-full pl-3 text-black "
          placeholder="What are your career plans?"
          onChange={(event) => {
            setInputMessage(event.target.value);
          }}
          value={inputMessage}
          onKeyDown={handleKeyPress}
        />
        <button
          id="sender"
          className={(allowRequests ? "send" : "send-disabled") + " mx-3"}
          disabled={!allowRequests}
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
  );
}
