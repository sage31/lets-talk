export default function Message({ messageData }) {
  let messageBaseStyle = "bg-chill-violet rounded-xl max-w-xl px-3 py-2 ";
  let dotStyle = "dot block mt-2 ";
  let nameStyle = "text-sm mt-10 ";

  if (messageData.role === "user") {
    messageBaseStyle += " mr-6";
    dotStyle += "float-right mr-3";
    nameStyle += "text-right";
  } else {
    messageBaseStyle += " ml-6";
    dotStyle += "text-left ml-3";
    nameStyle += "inline";
  }

  return (
    <div className="inline-block">
      <div
        className={messageBaseStyle}
        dangerouslySetInnerHTML={{ __html: messageData.content }}
      ></div>
      <div className={dotStyle}></div>
      {messageData.profileImgSrc && (
        <img
          alt="Profile"
          className="inline mr-2 rounded-full"
          src={messageData.profileImgSrc}
          width="30px"
        />
      )}
      <h1 className={nameStyle}>{messageData.name}</h1>
    </div>
  );
}
