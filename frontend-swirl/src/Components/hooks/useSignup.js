import { useState } from "react"
import {Flip, toast} from "react-toastify";
import  {useAuthContext } from "../context/AuthUser.jsx";


const useSignup = ()=>{
    const [loading, setLoading] = useState(false);
    const {setUser} = useAuthContext();
    
    const signup =async ({email, name, password, confirmPassword, gender})=>{
       const success = checkField({email, name, password, confirmPassword, gender});
        if(!success){
            return;
        }        

        setLoading(true);

        try{
            const username = email.split('@')[0];
            const res = await fetch("/api/auth/signup" ,{
                method : "POST",
                headers: {"Content-Type" : "Application/json"},
                body: JSON.stringify({username,email, name, password, confirmPassword, gender})
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

            console.log("error in signup :", e.message);
        }
        finally{
            setLoading(false);
        }


    }

    return {loading, signup};
}

const checkField =  ({email, name, password, confirmPassword, gender}) =>{
    
    if(!email || !name || !gender || !password || !confirmPassword){
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

    if(password.length <= 6){

        toast.error('password length must greater than 6',{
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

    if(password !== confirmPassword){
        toast.error("Password do not match",{
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

export default useSignup;