// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function Chatbox1() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await sendMessageToServer(input);
      console.log(data);
      setChatHistory([...chatHistory, { type: 'user', content: input }, { type: 'ai', content: data.answer }]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };


  const sendMessageToServer = async (input) => {
    try {
      const response = await axios.post('http://localhost:4000/chat', { input });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  useEffect(() => {
    // Make default request with empty input when component mounts
    const makeDefaultRequest = async () => {
      try {
        const data = await sendMessageToServer('');
        setChatHistory([{ type: 'ai', content: data.answer }]);
      } catch (error) {
        console.error(error);
      }
    };
    makeDefaultRequest();
  }, []);

  useEffect(() => {
    const scrollToBottom = () => {
      const chatBox = document.getElementById('chat-box');
      chatBox.scrollTop = chatBox.scrollHeight;
    };
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="container">
      <h1>Chat with AI</h1>
      <div id="chat-box" className="chat-box">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.type}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type your message here..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox1;
