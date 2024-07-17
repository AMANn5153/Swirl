import React from 'react'
import useGetUsers from '../../store/useGetUsers';
import { useSocket } from '../../context/SocketContext';

const Online = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useGetUsers();

  const isSelected = selectedConversation?._id === conversation._id;

  const {messages} = useGetUsers();


  const{online} = useSocket();
  console.log(online);
  const isOnline = online.find(element =>  element === conversation?._id)
  
  return (
    <div className={isSelected ? 'flex h-16 shadow-lg rounded-2xl p-1 m-4 cursor-pointer bg-skin-blue':'flex h-16 shadow-lg rounded-2xl p-1 m-4 cursor-pointer hover:bg-skin-blue'} 
    onClick={()=>setSelectedConversation(conversation)}>
        <div className="w-1/4  h-full rounded-full"> 
        <div className={isOnline != undefined?"avatar online": "avatar"}>
        <div className="w-14 rounded-full">
        <img className= "chat-image h-full rounded-full " alt="Tailwind CSS chat bubble component" src={conversation.profilePic} />
        </div>
      </div>
        </div>
     
        <div className='flex-1 '>
            <h1 className='font-bold text-blue'>{ conversation.name}</h1>
        </div>
    </div>
  )
}

export default Online;