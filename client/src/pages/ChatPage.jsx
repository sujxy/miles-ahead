import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import Message from "../components/message";

const messages = [
  {
    type: "AI",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo",
  },
  {
    type: "Human",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo",
  },
  {
    type: "AI",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo",
  },
  {
    type: "Human",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo",
  },
  {
    type: "AI",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo",
  },
  {
    type: "Human",
    content:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo",
  },
];

const ChatPage = () => {
  const { assessmentType } = useParams();
  return (
    <div>
      <Navbar type={"chat"} />
      <div className="grid max-h-[100vh] w-screen grid-cols-12 border px-24 pt-16">
        <div className=" col-span-3    py-8 ">
          <div className="  flex h-1/3 items-start justify-start gap-2   ">
            <div className=" h-full w-[8px]  rounded-full border ">
              <div className={`h-[35%] w-full rounded-full bg-primary`}></div>
            </div>
            <div className="flex h-full flex-col items-start justify-between gap-8 text-lg font-medium text-gray-500">
              <h3 className="font-semibold text-primary">About you</h3>
              <h3 className="font-semibold text-primary">Assessment</h3>
              <h3>Career Path</h3>
              <h3>Your Results</h3>
            </div>
          </div>
        </div>
        <div className="col-span-9 h-[92vh] overflow-y-scroll   pt-8">
          <div className="px-2 py-8">
            {" "}
            {messages.map((m, i) => (
              <Message key={i} type={m.type} message={m.content} />
            ))}
          </div>
          <div>input</div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
