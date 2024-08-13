import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('User')) | null
    );

    const updateUser = (data) => {
        setCurrentUser(data);
    }

    useEffect(()=>{
        localStorage.setItem('User', JSON.stringify(currentUser));
    }, [currentUser]);
    
    return (
        <AuthContext.Provider value={{currentUser, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}