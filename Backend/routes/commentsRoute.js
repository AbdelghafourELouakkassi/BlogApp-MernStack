const { createCommentCtrl,getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl } = require("../controllers/commentsController");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");
const router = require("express").Router();



//api/comments

router.route("/").post(verifyToken,createCommentCtrl)
.get(getAllCommentsCtrl);


//api/comments/:id
router.route("/:id").delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)




module.exports=router

