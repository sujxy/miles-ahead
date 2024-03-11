import React, { useState } from 'react'

const ChatInputBox = () => {
  const [userMsg,setUserMsg] = useState("");
  function onChangeHandler(event){
    setUserMsg(event.target.value) ;
  }
  return (
    <div>
      <input
      name="userMsg"
      value={userMsg}
      onChange={onChangeHandler}
      ></input>
      <button >{"->"}</button>
    </div>
  )
}

export default ChatInputBox