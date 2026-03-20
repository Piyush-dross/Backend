const followModel=require("../models/follow.model")
const userModel=require("../models/user.model")
async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followeeUsername === followerUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }

    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExist){
        return res.status(404).json({
            message:"User does not exist"
        })
    }

    const existing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(existing){
        return res.status(400).json({
            message:`Request already ${existing.status}`
        })
    }

    const followRequest = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"   // 🔥 Important
    })

    return res.status(201).json({
        message:"Follow request sent",
        follow: followRequest
    })
}
async function acceptFollowController(req,res){
    const currentUser = req.user.username
    const requesterUsername = req.params.username

    const request = await followModel.findOne({
        follower: requesterUsername,
        followee: currentUser,
        status: "pending"
    })

    if(!request){
        return res.status(404).json({
            message:"No pending request found"
        })
    }

    request.status = "accepted"
    await request.save()

    return res.status(200).json({
        message:`${requesterUsername} is now following you`
    })
}
async function rejectFollowController(req,res){
    const currentUser = req.user.username
    const requesterUsername = req.params.username

    const request = await followModel.findOne({
        follower: requesterUsername,
        followee: currentUser,
        status: "pending"
    })

    if(!request){
        return res.status(404).json({
            message:"No pending request found"
        })
    }

    request.status = "rejected"
    await request.save()

    return res.status(200).json({
        message:"Follow request rejected"
    })
}
async function unfollowController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if (!followRecord) {
        return res.status(404).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    if (followRecord.status === "pending") {
        await followRecord.deleteOne()
        return res.status(404).json({
            message: `Follow request cancelled`
        })
    }

    if (followRecord.status === "accepted") {
        await followRecord.deleteOne()
        return res.status(200).json({
            message: `You have unfollowed ${followeeUsername}`
        })
    }

    if (followRecord.status === "rejected") {
        await followRecord.deleteOne()
        return res.status(200).json({
            message: `Rejected request removed`
        })
    }
}
module.exports={
    followUserController,
    unfollowController,
    acceptFollowController,
    rejectFollowController
}

