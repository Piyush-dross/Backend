const mongoose=require("mongoose")
function connecttoDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to database")
    })
}
module.exports=connecttoDb