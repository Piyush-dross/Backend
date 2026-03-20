require('dotenv').config()
const app=require("./src/app")
const connecttodb=require("./src/config/database")
connecttodb()
app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")

})