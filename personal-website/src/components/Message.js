export default function Message({ messageData }) {
  let messageBaseStyle =
    "bg-chill-violet rounded-xl md:max-w-xl max-w-md  px-3 py-2 text-left";
  let dotStyle = "dot block mt-2 ";
  let nameStyle = "text-sm mt-8 ";

  if (messageData.role === "user") {
    messageBaseStyle += "ml-5 mr-3";
    dotStyle += "float-right mr-2";
    nameStyle += "text-right";
  } else {
    messageBaseStyle += " ml-3";
    dotStyle += "text-left ml-2 mb-2";
    nameStyle += "inline";
  }

  return (
    <div className={"inline-block mt-3 "}>
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
