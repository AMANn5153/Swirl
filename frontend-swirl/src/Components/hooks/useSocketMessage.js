import {useEffect} from 'react'
import useGetUsers from '../store/useGetUsers.js';
import {useSocket} from '../context/SocketContext.jsx'
import notification from '../media/notification.mp3'

const useSocketMessage = () => {
 const {messages, setMessages} = useGetUsers();
 const {socket} = useSocket();
 useEffect(() => {
    socket?.on( "sendMessage", (newMessages)=>{
        new Audio(notification).play();
        setMessages([...messages, newMessages]);
    })

    return ()=>socket?.off("sendMessages");
 },[setMessages, messages, socket]);
}

export default useSocketMessage;