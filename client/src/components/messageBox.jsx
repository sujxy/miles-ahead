import { useRecoilState, useRecoilValue } from "recoil";
import Message from "./message";
import { currentLevel, messageAtom, progressAtom } from "../store/atoms";
import React from "react";
import ChatInputBox from "./ChatInputBox";
import { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { BounceLoader } from "react-spinners";

const MessageBox = () => {
  const [progress, setProgress] = useRecoilState(progressAtom);
  const current = useRecoilValue(currentLevel);
  console.log(current);
  const [messages, setMessages] = useRecoilState(messageAtom);
  const [nextLevel, setNextLevel] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: "an error occured, Retry!",
  });
  //handle to next level
  const handleNextLevel = () => {
    setProgress((prev) => ({
      ...prev,
      [current[0]]: { status: true, name: current[1] },
    }));
    setNextLevel(false);
    setMessages([]);
  };

  //sending message
  const handleSendMessage = async () => {
    try {
      setMessages([...messages, { type: "Human", content: userMessage }]);
      setUserMessage("");
      setLoading(true);

      const { data } = await axios.post(`${current[2]}/question`, {
        userResponse: userMessage,
      });
      if (data.message) {
        if (data.message.status == "completed") {
          setMessages((prev) => [
            ...prev,
            { type: "AI", content: data.message.content },
          ]);
          setNextLevel(true);
        }
        if (data.message.status == "active") {
          setMessages((prev) => [
            ...prev,
            { type: "AI", content: data.message.content },
          ]);
        }
      } else {
        throw new Error(data.error);
      }
    } catch (e) {
      setError({ state: true, message: e.message });
      setTimeout(
        () => setError({ state: false, message: "An error occured, Retry!" }),
        1500,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className=" h-[82vh] grow overflow-y-scroll px-4 py-1 ">
        {" "}
        {messages.map((m, i) => (
          <Message key={i} type={m.type} message={m.content} />
        ))}
        {loading && (
          <div className="flex w-full items-center justify-start gap-3 py-2 ps-5">
            <BounceLoader size={25} color="#FF6B00" />
            <h1 className="text-base text-gray-500 ">Typing...</h1>
          </div>
        )}
        {error.state && (
          <div className="center-div w-full rounded-md bg-red-100 py-3 font-normal text-red-800">
            {error.message}
          </div>
        )}
        {nextLevel && (
          <div className="center-div w-full py-2">
            <button
              onClick={handleNextLevel}
              className=" w-2/12 rounded-full bg-primary px-4 py-2 text-white shadow-sm"
            >
              Proceed{" "}
              <span>
                <ArrowRight className="inline" />
              </span>
            </button>
          </div>
        )}
      </div>
      <ChatInputBox
        message={userMessage}
        setMessage={setUserMessage}
        handleSend={handleSendMessage}
      />
    </React.Fragment>
  );
};

export default MessageBox;
