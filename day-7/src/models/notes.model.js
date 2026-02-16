const mongoose=require("mongoose")
const noteSchema= new mongoose.Schema(
{
    tittle: String,
    description: String,
    age:String,
}
)
const noteModel=mongoose.model("notes",noteSchema)
module.exports=noteModel