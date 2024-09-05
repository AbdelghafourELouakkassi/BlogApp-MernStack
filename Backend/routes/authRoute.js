const router=require("express").Router()
const {registerUserCtrl,loginUserCtrl}= require("../controllers/authController")

//api/auth/register
router.route("/register").post(registerUserCtrl)


//api/auth/login
router.route("/login").post(loginUserCtrl)




 module.exports= router;