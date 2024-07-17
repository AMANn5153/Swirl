import { useState } from "react"
import { useAuthContext } from "../context/AuthUser";
import { toast,Flip } from "react-toastify";


export const useLogout =()=>{
    const[loading, setLoading] = useState(false);
    const {setUser} = useAuthContext();

    const logout = async()=>{
        setLoading(true);
        try{
            const res = await fetch("/api/auth/logout", {
                method:"GET",
                headers:{"Content-Type":"application/json"},
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("user-data");
            setUser(null);
           
        }
        catch(e){
            console.log(e);
            toast.error(e,{
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
    return {loading, logout};

}