const postModel = require("../models/post.model")
const ImageKit = require("imagekit")
const likeModel=require("../models/like.model")
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createpostController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const uploadedFile = await imagekit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
      folder:"cohort-2-insta-clone"
    })

    const post=await postModel.create({
      caption:req.body.caption,
      imageUrl:uploadedFile.url,
      user:req.user.id
    })

    res.status(201).json({
      message:"Post created Successfully",
      post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Upload failed" })
  }
}

async function getpostController(req,res){
  try {
    const userId=req.user.id
    const posts=await postModel.find({
      user:userId
    })

    res.status(200).json({
      message:"POST Fetched Successfully",
      posts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch post" })
  }
}

async function getpostDetails(req,res){
  try {
    const userId=req.user.id
    const postId=req.params.postid
    const post=await postModel.findById(postId)

    if(!post){
      return res.status(404).json({
        message:"post not found"
      })
    }

    const isValidUser=post.user.toString()===userId
    if(!isValidUser){
      return res.status(403).json({
        message:"Forbidden content"
      })
    }

    return res.status(200).json({
      message:"post fetched succesfully",
      post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch post details" })
  }
}

async function likepostController(req,res){
  try {
    const userId=req.user.id
    const postId=req.params.postid
    const post=await postModel.findById(postId)

    if(!post){
      return res.status(404).json({
        message:"post not found"
      })
    }

    const existingLike = await likeModel.findOne({
      user:userId,
      post:postId,
    })

    if(existingLike){
      return res.status(200).json({
        message:"post already liked",
        like:existingLike,
        isLiked:true
      })
    }

    const like=await likeModel.create({
      user:userId,
      post:postId,
    })

    return res.status(200).json({
      message:"post liked succesfully",
      like,
      isLiked:true
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to like post" })
  }
}

async function unlikepostController(req,res){
  try {
    const userId=req.user.id
    const postId=req.params.postid

    const deletedLike = await likeModel.findOneAndDelete({
      user:userId,
      post:postId,
    })

    if(!deletedLike){
      return res.status(200).json({
        message:"post already unliked",
        isLiked:false
      })
    }

    return res.status(200).json({
      message:"post unliked succesfully",
      isLiked:false
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to unlike post" })
  }
}

async function getfeedController(req,res){
  try {
    const userId=req.user.id
    const allPosts=await postModel.find()
      .populate({ path: "user", select: "-password" }).sort({_id:-1})
      .lean()

    const posts=await Promise.all(allPosts.map(async(post)=>{
      const isLiked=await likeModel.findOne({
        user:userId,
        post: post._id
      })

      return {
        ...post,
        isLiked:Boolean(isLiked)
      }
    }))

    return res.status(200).json({
      message:"posts fetched successfully",
      posts
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Failed to fetch feed" })
  }
}

module.exports = {
  createpostController,
  getpostController,
  getpostDetails,
  likepostController,
  unlikepostController,
  getfeedController
}
