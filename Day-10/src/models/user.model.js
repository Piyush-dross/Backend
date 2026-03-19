const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:String,
    Email:{
        type:String,
        unique:[true,"user with this email already existed"]
    },
    Password:String,
})
const usermodel=mongoose.model("users",userSchema)
module.exports=usermodel