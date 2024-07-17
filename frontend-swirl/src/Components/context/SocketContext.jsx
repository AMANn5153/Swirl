import {createContext, useContext, useEffect, useState} from 'react'
import {useAuthContext } from './AuthUser';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocket = () =>{
    return useContext(SocketContext);
}




export const SocketContextProvider = ({children}) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);
  const {user} = useAuthContext(); 
  useEffect(()=>{

    if(user){
        const newSocket = io('http://localhost:3001/',{
            query:{userId:user._id}
        });
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (users)=>{
            setOnline(users);
        });
        return ()=> newSocket.close();
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
  },[user]);
  return <SocketContext.Provider value={{socket, online}}>{children}</SocketContext.Provider>;
}

