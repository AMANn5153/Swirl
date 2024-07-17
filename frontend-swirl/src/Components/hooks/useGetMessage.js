import {useState, useEffect} from 'react'
import useGetUsers from '../store/useGetUsers';
import { toast, Flip } from 'react-toastify';

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useGetUsers();

    useEffect(()=>{
        const getMessage= async()=>{
            try{
                setLoading(true);
                const res = await fetch(`/api/message/find/${selectedConversation?._id}`);
                const data = await res.json();
                if(data.error){
                    throw  new Error(data.error);
                }
                setMessages(data);
            }
            catch(e){
                toast.error(e.message,{
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            }
            finally{
                setLoading(false);
            }
        }
        if(selectedConversation?._id)getMessage();
    },[selectedConversation?._id, setMessages]);

    return {messages, loading};
 
}

export default useGetMessage