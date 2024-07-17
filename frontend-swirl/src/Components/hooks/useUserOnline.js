import React, { useEffect, useState } from 'react'
import {Flip, toast } from 'react-toastify';

const useUserOnline = () => {
 const [loading, setLoading] = useState(true);
 const [user, setUser] = useState(null);
 
 
 useEffect(()=>{

    const conversation = async () =>{
        setLoading(true);
        try{
            const res = await fetch('/api/user/',{
                credentials:'include'
            });
            const data = await res.json();
         
            if(data.error){
                throw  new Error(data.error);
            }
            setUser(data.combinedUsers);
           
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


    conversation();

 },[])


 return {user, loading};
 
}

export default useUserOnline