const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt=require("bcryptjs")

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  })
}

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  const userAlreadyexists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyexists) {
    return res.status(409).json({
      message:
        userAlreadyexists.email === email
          ? "Email already exists"
          : "Username already exists",
    });
  }

  const hash = await bcrypt.hash(password,10)
  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user.id,
      username:user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  setAuthCookie(res, token)

  res.status(201).json({
    message: "user registered successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [
      { username },
      { email },
    ],
  }).select("+password")

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  
  const passwordvalid = await bcrypt.compare(password,user.password)
  if (!passwordvalid) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username:user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  setAuthCookie(res, token)

  res.status(200).json({
    message: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = { loginController, registerController };
