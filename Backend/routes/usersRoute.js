const router=require("express").Router();
const { getAllUsersCtrl, getUserCtrl ,updateUserCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteUserCtrl} = require("../controllers/usersController");
const  uploadPhoto  = require("../middlewares/uploadPhoto");
const { validateObjectId } = require("../middlewares/validateObjectId");
const {verifyTokenAndAdmin, verifyTokenAndUser, verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");



// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin,getAllUsersCtrl);

//upload photo route
router.route("/profile/profile-upload-photo").post(verifyToken,uploadPhoto.single("image"),profilePhotoUploadCtrl);

//count users route
router.route("/count").get(verifyTokenAndAdmin,getUsersCountCtrl);


//ge and update and delete user routes
router.route("/profile/:id")
.get(validateObjectId,getUserCtrl)
.put(validateObjectId,verifyTokenAndUser,updateUserCtrl)
.delete(validateObjectId,verifyTokenAndAuthorization,deleteUserCtrl)


module.exports=router