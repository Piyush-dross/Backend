const express=require("express")
const app=express()
const noteModel=require("./models/notes.model")
app.use(express.json())
app.post("/notes",async(req,res)=>{
    const{tittle,description,age}=req.body
    const note= await noteModel.create({
        tittle,
        description,
        age
    })
    res.status(201).json({
        message:"note created successfully",
        note,
        age
    })
})
app.get("/notes",async(req,res)=>{
   const notes= await noteModel.find()
   res.status(200).json({
        message:"note created successfully",
        notes
     
    })
})
module.exports=app