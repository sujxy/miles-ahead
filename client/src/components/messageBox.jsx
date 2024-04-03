import { useRecoilState, useRecoilValue } from "recoil";
import Message from "./message";
import {
  chatAtom,
  currentLevel,
  messageAtom,
  progressAtom,
} from "../store/atoms";
import React from "react";
import ChatInputBox from "./ChatInputBox";
import { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { BounceLoader } from "react-spinners";
import { useEffect } from "react";
import { useRef } from "react";

const MessageBox = () => {
  const [progress, setProgress] = useRecoilState(progressAtom);
  const current = useRecoilValue(currentLevel);

  const [messages, setMessages] = useRecoilState(messageAtom);
  const [chat, setChat] = useRecoilState(chatAtom);
  const [nextLevel, setNextLevel] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: "an error occured, Retry!",
  });

  const boxRef = useRef();
  //fetch message from backend
  useEffect(() => {
    const getChatMessages = async () => {
      try {
        const { data } = await axios.get(
          `/chat/getAllMessages?chatId=${current[1] == "Personality" ? chat.chatId1 : chat.chatId2}`,
        );
        if (data.message) {
          setMessages(data.message);
        }
      } catch (e) {
        console.log(e);
        setMessages([]);
      }
    };

    getChatMessages();
  }, [chat, setMessages, current]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);
  //scroll to bottom function
  const scrollToBottom = () => {
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  };

  //handle to next level
  const handleNextLevel = () => {
    setProgress((prev) => ({
      ...prev,
      [current[0]]: { status: true, name: current[1] },
    }));
    setNextLevel(false);
    localStorage.removeItem("chatId");
    setChat({ chatId: "", type: "" });
    setMessages([]);
  };

  //sending message
  const handleSendMessage = async () => {
    try {
      setMessages([...messages, { type: "Human", content: userMessage }]);
      setUserMessage("");
      setLoading(true);

      const type =
        current[1] == "Personality" ? "assessment_1" : "assessment_2";

      const chatId = current[1] == "Personality" ? chat.chatId1 : chat.chatId2;
      console.log(current[2]);
      const { data } = await axios.post(`${current[2]}/question`, {
        userResponse: userMessage,
        chat_id: chatId,
        type: type,
      });
      if (data.message) {
        if (data.message.status == "completed") {
          console.log("this assessment ended!");
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
        if (data.chatId && (!chat.chatId1 || !chat.chatId2)) {
          if (type == "assessment_1") {
            localStorage.setItem("chatId1", data.chatId);
            setChat({ ...chat, chatId1: data.chatId });
          } else {
            localStorage.setItem("chatId2", data.chatId);
            setChat({ ...chat, chatId2: data.chatId });
          }
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
      <div ref={boxRef} className=" h-[82vh] grow overflow-y-scroll px-4 py-1 ">
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
