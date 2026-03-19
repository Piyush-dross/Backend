const express=require("express")
const app=express()
app.use(express.json())
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/auth.routes")
app.use("/api/auth",authRouter)
app.use(cookieParser())
module.exports=app