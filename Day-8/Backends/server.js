//server start kerna 
//databse se connect kerna
const connecttodb=require("./src/config/database")
const app=require("./src/app")
require('dotenv').config()
connecttodb()
app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})