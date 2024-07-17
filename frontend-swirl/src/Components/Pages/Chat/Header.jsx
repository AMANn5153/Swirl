import React from 'react'
import { useSocket } from '../../context/SocketContext'


const Header = ({selectedConversation}) => {
  const{online} = useSocket();
  console.log(online);
  const isOnline = online.find(element =>  element === selectedConversation._id)
  return (
    <div className='swirl-menu  glass-effect'>
        <div className="w-1/4 h-full rounded-full  "> 
            <img className= "chat-image h-full avatar rounded-full" alt="Tailwind CSS chat bubble component" src={selectedConversation.profilePic} />
        </div>
        <div className='flex-1 swirl-menu-info'>
            <h1 className='uppercase font-bold text-blue'>{ selectedConversation.name}</h1>
            <h3 className='text-blue'>{isOnline != undefined ? "online" : "offline"} </h3>
        </div>
    </div>
  )
}

export default Header