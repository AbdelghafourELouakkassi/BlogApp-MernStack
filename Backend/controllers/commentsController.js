const asyncHandler = require("express-async-handler");

const {Comment,validateCreateComment,validateUpdateComment}=require("../models/Comment")
const {User}=require("../models/User")




/**
 * @desc create new comment
 * @route /api/comments/
 * @method POST
 * @access private (only logged in user)
 */


module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  // validation for comming data from client
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const profile=await User.findById(req.user.id);
  const comment=await Comment.create({
    postId:req.body.postId,
    text:req.body.text,
    user:req.user.id,
    username:profile.username
  });

  res.status(201).json(comment)
  
})


/**
 * @desc get All comments
 * @route /api/comments/
 * @method GET
 * @access public 
 */


module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments=await Comment.find().populate("user",["-password"]);

  if(!comments){
    return res.status(404).json({
      message:"there are no comments"
    })
  }

  res.status(200).json(comments)
  
})


/**
 * @desc delete comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only admin or the owner of the comment can delete it)
 */

module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment=await Comment.findById(req.params.id);
  if(!comment){
    return res.status(404).json({
      message:"comment not found"
    })
  }

  if(req.user.isAdmin || req.user.id===comment.user.toString()){
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"comment has been deleted successfully",comment})
  }
  else{
    res.status(403).json({message:"access denied, not allowed"})

  }

})


/**
 * @desc update comment
 * @route /api/comments/:id
 * @method PUT
 * @access private (only the owner of the comment can update it)
 */

module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
   // validation for comming data from client
   const { error } = validateUpdateComment(req.body);
   if (error) {
     return res.status(400).json({
       message: error.details[0].message,
     });
   }

  const comment=await Comment.findById(req.params.id);
  if(!comment){
    return res.status(404).json({
      message:"comment not found"
    })
  }

   // check if this post belong to logged in user
  else if (req.user.id !== comment.user.toString()) {
    return res.status(403).json({
      message: "access denied, you are not allowed",
    });
  }

  //update comment
  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  )
  res.status(200).json({
    message:"comment has been updated successfully",
    updatedComment
  })


})