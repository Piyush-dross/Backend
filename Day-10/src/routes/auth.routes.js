//auth router used to create routes,api in another folder than app.js
//all authentication and registration done in this file
const express=require("express")
const authRouter=express.Router()
const jwt=require("jsonwebtoken")
const usermodel=require("../models/user.model")
const crypto=require("crypto")
authRouter.post("/register",async(req,res)=>{
    const {Email,name,Password}=req.body
    const useralreadyexists=await usermodel.findOne({Email})
    if (useralreadyexists){
        return res.status(409).json({
            message:"user with this email already exists with this email address"
        })
    }
    const hash=crypto.createHash("md5").update(Password).digest("hex")
    const user=await usermodel.create({
        Email,name,Password:hash
    })
    // console.log("JWT_SECRET:", process.env.JWT_SECRET)
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
authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);
    res.status(200).json({
        message:"this is a protected route"
    })
})
authRouter.post("/login",async(req,res)=>{
    const {Email,Password}=req.body
    const user=await usermodel.findOne({Email})
    if(!user){
        return res.status(404).json({
            message:"user with this email not found"
        })
    }
    const ispasswordmatched=user.Password===crypto.createHash("md5").update(Password).digest("hex")
    if(!ispasswordmatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    return res.status(200).json({
        message:"user logged in",
        user,
    })
})
module.exports=authRouter