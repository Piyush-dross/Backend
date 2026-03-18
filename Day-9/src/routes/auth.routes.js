//auth router used to create routes,api in another folder than app.js
//all authentication and registration done in this file
const express=require("express")
const authRouter=express.Router()
const jwt=require("jsonwebtoken")
const usermodel=require("../models/user.model")
authRouter.post("/register",async(req,res)=>{
    const {Email,name,Password}=req.body
    const useralreadyexists=await usermodel.findOne({Email})
    if (useralreadyexists){
        return res.status(400).json({
            message:"user with this email already exists with this email address"
        })
    }
    const user=await usermodel.create({
        Email,name,Password
    })
    const token=jwt.sign(
        {
            id:user._id,
            email:user._email
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)
    res.status(201).json({
        message: "user registered",
        user,
        token
    })

})
module.exports=authRouter