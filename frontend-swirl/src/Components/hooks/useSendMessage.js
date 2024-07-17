import {useState} from 'react'
import useGetUsers from '../store/useGetUsers';
import { toast, Flip } from 'react-toastify';

const useSendMessage = () => {
 const [loading, setLoading] = useState(false);
 const {messages, setMessages, selectedConversation} = useGetUsers()
 const id = selectedConversation?._id;
 

 const sendMessage =async (message) =>{
    setLoading(true);
    try{
        const res = await fetch(`/api/message/send/${id}/`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message})
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        setMessages([...messages, data]);
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
 return {loading, sendMessage}
}

export default useSendMessage