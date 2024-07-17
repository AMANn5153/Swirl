import {createContext, useContext, useState} from 'react';

export const  authContext = createContext();

export const  useAuthContext = () =>{
    return useContext(authContext);
}

export const AuthUser = ({children})=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user-data')) || null);
    return (
        <authContext.Provider value={{user, setUser}}>
            {children}
        </authContext.Provider>
    )
}

