//cluster=storage+processor
//cluster can hold more than one database
const mongoose=require("mongoose")

require("dotenv").config()
const connecttodatabase=require("./src/config/database")
const app=require("./src/app")
connecttodatabase()
app.listen(3000,()=>{
    console.log("server start")
})