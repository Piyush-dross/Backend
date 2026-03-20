const express=require("express")
const postRouter=express.Router()
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const createpostController=require("../controller/post.controller")
const identifyUser=require("../middlewares/auth.middleware")

postRouter.post("/",upload.single("image"),identifyUser,createpostController.createpostController)
postRouter.get("/",identifyUser,createpostController.getpostController)
postRouter.get("/details/:postid",identifyUser,createpostController.getpostDetails)
postRouter.post("/like/:postid",identifyUser,createpostController.likepostController)
postRouter.delete("/like/:postid",identifyUser,createpostController.unlikepostController)
postRouter.get("/feed",identifyUser,createpostController.getfeedController)

module.exports=postRouter
