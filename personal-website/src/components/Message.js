export default function Message({ messageData }) {
  return (
    <div className="inline-block">
      <div
        className="bg-violet-900 rounded-xl max-w-xl px-3 py-2"
        dangerouslySetInnerHTML={{ __html: messageData.content }}
      ></div>
      {messageData.profileImgSrc && (
        <img
          alt="Profile"
          className="inline mr-2 rounded-full"
          src={messageData.profileImgSrc}
          width="25px"
        />
      )}
      <h1 className="text-sm inline"> {messageData.name} </h1>
    </div>
  );
}
