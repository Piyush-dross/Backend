const mongoose=require("mongoose")
function connecttodatabase(){

    mongoose.connect(process.env.MONGO_URI)

    .then(()=>{
        console.log("connected to database")
    })
}
module.exports=connecttodatabase