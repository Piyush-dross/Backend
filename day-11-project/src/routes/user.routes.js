const express = require("express")
const userRouter = express.Router()

const UserController = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

// Send follow request
userRouter.post(
    "/follow/:username",
    identifyUser,
    UserController.followUserController
)

// Accept follow request
userRouter.patch(
    "/follow/accept/:username",
    identifyUser,
    UserController.acceptFollowController
)

// Reject follow request
userRouter.patch(
    "/follow/reject/:username",
    identifyUser,
    UserController.rejectFollowController
)

// Unfollow / Cancel request
userRouter.delete(
    "/unfollow/:username",
    identifyUser,
    UserController.unfollowController
)

// Get pending requests
// userRouter.get(
//     "/follow/requests",
//     identifyUser,
//     UserController.getPendingRequests
// )

module.exports = userRouter