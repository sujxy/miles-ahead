import { Send } from "lucide-react";

const ChatInputBox = ({ message, setMessage, handleSend }) => {
  return (
    <div className=" mb-4  grid h-20 grid-cols-12  overflow-hidden rounded-lg border shadow-lg ">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="get guidance.."
        className="col-span-11 px-3 outline-none "
      />{" "}
      <button
        disabled={message.length <= 0 ? true : false}
        onClick={handleSend}
        className="col-span-1 m-1 flex items-center justify-center rounded-md bg-primary text-white disabled:bg-gray-400 "
      >
        <Send />
      </button>{" "}
    </div>
  );
};

export default ChatInputBox;
