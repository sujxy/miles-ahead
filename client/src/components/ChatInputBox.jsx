import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setChatHistory } from '../redux/appSlice';

const ChatInputBox = () => {
  const [userMsg, setUserMsg] = useState("");
  let conversationArray = useSelector(state => state.appslice.chatHistory) ;
  const dispatch = useDispatch() ;
  function onChangeHandler(event) {
    setUserMsg(event.target.value);
    
  }

  function sendHandler(){
    console.log(typeof(conversationArray));
    console.log(conversationArray);
   const myObj = {"userresponse":userMsg} ;
   let str = userMsg ;
    conversationArray = [...conversationArray,userMsg] ;
    dispatch(setChatHistory(conversationArray)) ;
  }
  return (
    <div>
      <input
        name="userMsg"
        value={userMsg}
        onChange={onChangeHandler}
      ></input>
      <button onClick={sendHandler} >{"->"}</button>
    </div>
  )
}

export default ChatInputBox
