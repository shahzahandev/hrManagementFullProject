const User = require("../models/userSchema")
const bcrypt = require('bcrypt');

// User Registration part
let registrationController = async (req, res) => {
  let { username, useremail, userpassword } = req.body

  // Check Existing user
  try {
    let existingUser = await User.findOne({ useremail: useremail })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exists."
      })
    }
    // Password bcrypt
    // Advance lavel
    let hash = bcrypt.hashSync(userpassword, 10)
    // todo for next validation --- 
    let createUser = new User({
      username: username,
      useremail: useremail,
      userpassword: hash
    })
    createUser.save()
    res.send({
      username: createUser.username,
      useremail: createUser.useremail,
      message: "Registration success."
    })
    // primary bcrypt code ----------
    // bcrypt.hash(userpassword, 10, function (err, hash) {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: false,
    //       message: "Server error."
    //     })
    //   }
    //   // todo for next validation
    //   let createUser = new User({
    //     username: username,
    //     useremail: useremail,
    //     userpassword: hash
    //   })
    //   createUser.save()
    //   res.send({
    //     username: createUser.username,
    //     useremail: createUser.useremail
    //   })
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error."
    })
  }
}

// User Login part
let loginController = async (req, res) => {
  let { useremail, userpassword } = req.body
  const existingUser = await User.findOne({ useremail: useremail })
  // User can not loging to another divece, if user currently login mood.
  if (existingUser.isLogin) {
    return res.status(400).json({
      success: false,
      message: "Please, Logout from another device."
    })
  }
  // If user not avaiable
  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User is not found."
    })
  }
  // matching pass(if frontend password == Database password)
  let pass = bcrypt.compareSync(userpassword, existingUser.userpassword)
  // console.log(pass); 
  if (pass) {
    existingUser.isLogin = true
    existingUser.save()
    return res.status(200).json({
      success: true,
      message: "Lonin success."
    })
  } else {
    return res.status(404).json({
      success: false,
      message: "Invalid Credential."
    })
  }
}

// User logout part
let logoutController = async (req, res) => {
  let { id } = req.body
  try {
    let existingUser = await User.findOne({ _id: id })
    existingUser.isLogin = false
    existingUser.save()
    return res.status(200).json({
      success: true,
      message: "Logout success."
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error."
    })
  }
}

module.exports = { registrationController, loginController, logoutController }