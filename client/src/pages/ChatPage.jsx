import React from 'react'
import ChatInputBox from '../components/ChatInputBox'

const ChatPage = () => {
  const conversationArray = [] ;
  return (
    <div>
        <div>
          chat history
          {
            conversationArray.map((item)=>{
              return <div>
                <p>{item.system}</p>
                <p>{item.user}</p>
               </div> 
            })
          }
          </div>
        <ChatInputBox/>
    </div>
  )
}

export default ChatPage