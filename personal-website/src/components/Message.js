import { useEffect, useRef } from "react";

export default function Message({ messageData }) {
  const messageRef = useRef(null);

  let messageBaseStyle =
    "bg-chill-violet rounded-xl md:max-w-xl max-w-md px-3 py-2 text-left ";
  let dotStyle = "dot block mt-2 ";
  let nameStyle = "text-sm mt-8 ";

  if (messageData.role === "user") {
    messageBaseStyle += " mr-4 ";
    dotStyle += "float-right mr-2";
    nameStyle += "text-right";
  } else {
    messageBaseStyle += " ml-3";
    dotStyle += "text-left ml-2 mb-2";
    nameStyle += "inline";
  }

  // This useEffect hook solves a CSS headache, found on
  // https://stackoverflow.com/questions/14596213/shrink-div-to-text-thats-wrapped-to-its-max-width
  useEffect(() => {
    if (messageRef.current && messageRef.current.id === "user") {
      const messageElement = messageRef.current;

      const getLength = (text) => {
        const span = document.createElement("span");
        span.innerHTML = text === " " ? "&nbsp;" : text;
        messageElement.appendChild(span);
        const len = span.offsetWidth;
        messageElement.removeChild(span);
        return len;
      };

      const words = messageElement.innerHTML.split(" ");
      const lengthOfSpace = getLength(" ");
      let lengthOfLine = 0;
      let maxElementWidth =
        window.innerWidth > 640
          ? 28 * parseFloat(getComputedStyle(document.documentElement).fontSize)
          : 20 *
            parseFloat(getComputedStyle(document.documentElement).fontSize);
      let maxLineLengthSoFar = 0;

      for (let i = 0; i < words.length; i++) {
        if (words[i] === "") continue;

        const curWord = getLength(words[i]);
        if (
          lengthOfLine + (i === 0 ? 0 : lengthOfSpace) + curWord >
          maxElementWidth
        ) {
          if (lengthOfLine > maxLineLengthSoFar) {
            maxLineLengthSoFar = lengthOfLine;
            lengthOfLine = 0;
          }
        } else {
          lengthOfLine += (i === 0 ? 0 : lengthOfSpace) + curWord;
        }
      }
      if (maxLineLengthSoFar !== 0) {
        messageElement.style.width = maxLineLengthSoFar + "px";
      }
    }
  }, [messageData.content]);

  return (
    <div className={"mt-3 inline-block "}>
      <div
        id={messageData.role}
        ref={messageRef}
        className={messageBaseStyle}
        dangerouslySetInnerHTML={{ __html: messageData.content }}
      ></div>
      <div className={dotStyle}></div>
      {messageData.profileImgSrc && (
        <img
          alt="Profile"
          className="mr-2 inline rounded-full"
          src={messageData.profileImgSrc}
          width="30px"
        />
      )}
      <h1 className={nameStyle}>{messageData.name}</h1>
    </div>
  );
}
