const express=require("express")
const dotenv=require("dotenv")
const app=express()
const cookieParser=require("cookie-parser")
const cors=require("cors")
/**
 * middleware to read json and cookie 
 */
app.use("/uploads", express.static("uploads"))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
    }
))

/**
 * required routes
*/
const postRouter=require("./routes/post.routes")
const authRouter = require("./routes/auth.routes")
const userRouter=require("./routes/user.routes")
/**
 * using routes
 */
app.use("/api/post",postRouter)
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)

module.exports=app