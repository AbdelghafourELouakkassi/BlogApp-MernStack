const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const crypto = require("crypto");

/**
 * @desc register new user
 * @router /api/auth/register
 * @method POST
 * @access public
 */

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();

  //response to the client

  res.status(201).json({
      message: "you have registered successfully, please log in",
    });
});

/**
 * @desc login
 * @router /api/auth/login
 * @method POST
 * @access public
 */

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }


  //generate token

  const token = user.generateAuthToken();

  res.status(200).json({
    _uid: user.id,
    isAdmin: user.isAdmin,
    username: user.username,
    profilePhoto: user.profilePhoto,
    token,
  });
});

