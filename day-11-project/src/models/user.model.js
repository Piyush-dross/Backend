const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select:false
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/rhxq2hk1a/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.webp",
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
