const mongoose=require("mongoose")
const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
         type:String,
        required:[true,"imgUrl is required for creating post"]
    },
    user:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required for creating an post"]
    }
})
const postModel=mongoose.model("posts",postSchema)
module.exports=postModel