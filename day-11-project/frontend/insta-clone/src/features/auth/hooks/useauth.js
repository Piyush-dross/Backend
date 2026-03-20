import { use, useContext } from "react";
import { AuthContext } from "../auth.context";
import { login } from "../services/auth.api"
import { register } from "../services/auth.api"
export const useauth=()=>{
    const context=useContext(AuthContext)
    const {user,setUser,loading,setloading}=context
    const handlelogin = async (username,email,password)=>{
    try{
        setloading(true)

        const response = await login(username,email,password)

        setUser(response.user)

        return true
    }
    catch(err){
        console.log(err)
        return false
    }
    finally{
        setloading(false)
    }
    }
   const handleregister = async(username,email,password)=>{
   try{
      setloading(true)

      const res = await register(username,email,password)

      return true
   }
   catch(err){
      console.log(err)
      return false
   }
   finally{
      setloading(false)
   }
    }
    return{
        user,loading,handlelogin,handleregister
    }
}