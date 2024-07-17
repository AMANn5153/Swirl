import { useState } from "react"
import {Flip, toast} from "react-toastify";
import  {useAuthContext } from "../context/AuthUser.jsx";


const useLogin = ()=>{
    const [loading, setLoading] = useState(false);
    const {setUser} = useAuthContext();
    
    const login =async (email, password)=>{
       const success = checkField(email, password);
        if(!success){
            return;
        }        

        setLoading(true);

        try{
            const res = await fetch("/api/auth/login" ,{
                method : "POST",
                headers: {"Content-Type" : "Application/json"},
                body: JSON.stringify({email, password})
            })


            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }
            
            localStorage.setItem('user-data', JSON.stringify(data));
            setUser(data);
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

            console.log("error in loging :", e.message);
        }
        finally{
            setLoading(false);
        }


    }

    return {loading, login};
}

const checkField =  (email, password) =>{
    
    if(!email || !password ){
        console.log(email,password);
        toast.error("Fill up all the fields", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        })
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!(emailRegex.test(email))){

        toast.error("Email provided is not valid Email",{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        })
        return false;
    }

    return true;

}

export default useLogin;