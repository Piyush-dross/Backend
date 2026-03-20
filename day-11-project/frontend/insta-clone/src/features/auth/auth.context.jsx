import { useState,createContext } from "react";
export const AuthContext=createContext()
export const AuthProvider=({children})=>{
    const [User, setUser] = useState(null)
    const [loading, setloading] = useState(false)
    return(
        <AuthContext.Provider value={{User,setUser,loading,setloading}}>
            {children}
        </AuthContext.Provider>
    )
}