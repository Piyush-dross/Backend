const app=require("./src/app")
const mongoose=require("mongoose")
function connectTodb(){
    mongoose.connect("mongodb+srv://capcutpro962_db_user:Ssp70MFfMWZaLgdr@cluster-1.q0rh46m.mongodb.net/DAY-6")
    .then(()=>{
        console.log("connected to database")
    })
}
app.listen(3000,()=>{
    console.log("hello")
    connectTodb()
})