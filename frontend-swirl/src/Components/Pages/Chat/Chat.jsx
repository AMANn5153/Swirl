import React from 'react'
import {useAuthContext } from '../../context/AuthUser'
import useGetUsers from '../../store/useGetUsers';
import { extractTime } from '../../util/extractTime';

const Chat = ({message}) => {
  const {user} = useAuthContext();
  const {selectedConversation} = useGetUsers();
  const sender = user._id === message.senderId ? 'chat chat-end' : 'chat chat-start';
  const color_bubble = user._id === message.senderId ? 'bg-grey-600':'';
  const info = sender == 'chat chat-end'? user : selectedConversation;
  const time = extractTime(message.createdAt);

  return (
  <>
    <div className={sender}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={info.profilePic} />
    </div>
  </div>
  <div className="chat-header">
  </div>
  <div className={`chat-bubble text-white  ${color_bubble}`}>
  <pre className='whitespace-pre-wrap font-thin '> {message.message}</pre></div>
  <div className="chat-footer opacity-50">
  <time className="text-xs ">{time}</time>
  </div>
</div>

  </>
    
  )
}

export default Chat