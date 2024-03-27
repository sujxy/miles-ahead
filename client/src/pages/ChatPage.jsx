import React from 'react'
import ChatInputBox from '../components/ChatInputBox'
import {  useSelector , useDispatch } from 'react-redux';
import { toggleLogin } from '../redux/appSlice';
import { BiSend } from "react-icons/bi";

import  { useState } from 'react';

const ChatPage = () => {
 const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!', sender: 'User' },
    { id: 2, text: 'How can I help you?', sender: 'Bot' },
 ]);
 const [input, setInput] = useState('');

 const sendMessage = () => {
    setMessages([...messages, { id: messages.length + 1, text: input, sender: 'User' }]);
    setInput('');
 };

 return (
  <div>
    
     <div className="bg-primary absolute top-0  left-0 z-0 h-[400px] w-3/5   rounded-lg blur-[100px] "></div>
    <div className="flex flex-col h-screen w-full  items-center ">
      <div className="overflow-y-auto p-4 space-y-4 w-9/12 h-screen rounded  backdrop-filter backdrop-blur-sm bg-white z-10 absolute opacity-50 "></div>
      <div className="overflow-y-auto p-4 space-y-4 w-9/12 h-screen rounded  backdrop-filter backdrop-blur-sm  z-10 relative bg-transparent">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-end ${message.sender === 'Bot' ? 'font-bold text-lg  border-b-2 border-orange-700 ' : 'font-normal'}  text-black `}>
          <div className={`max-w-xs p-2 rounded-lg `}>
            {message.text}
          </div>
        </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-200 px-4 py-2 bg-orange-300 flex w-9/12 relative z-10 ">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
          placeholder="Type a message..."
        />
        <div onClick={sendMessage} className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg"><BiSend className='w-8 h-8 text-white z-12' /></div>
      </div>
     
    </div>
      <div className="bg-primary absolute bottom-0 right-0  z-0 h-[400px] w-3/5  translate-x-[18%] rounded-full  blur-[100px]"></div>
    </div>
 );
};

export default ChatPage;
