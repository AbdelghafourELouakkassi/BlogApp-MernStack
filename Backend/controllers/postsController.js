const asyncHandler = require("express-async-handler");
const path = require("path");
const {cloudinaryUploadImage,cloudinaryRemoveImage} = require("../utils/cloudinary");
const fs = require("fs");
const {validateCreatePost,Post,validateUpdatePost} = require("../models/Post");
const {Comment} = require("../models/Comment");

/**
 * @desc create new post
 * @route /api/posts/
 * @method POST
 * @access private (only logged in user)
 */

module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  // validation for image
  if (!req.file) {
    return res.status(400).json({
      message: "no file provided",
    });
  }

  // validation for comming data
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  //  get the path of image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  //  upload image
  const result = await cloudinaryUploadImage(imagePath);

  // create new post and save it to db
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  //send response to client
  res.status(201).json({ message: "your post has been created", post });

  //remove image from image folder and keep it in cloudinary assets
  fs.unlinkSync(imagePath);
});

/**
 * @desc  get posts and do pagination
 * @route /api/posts/
 * @method GET
 * @access public
 */

module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const post_per_page = 3;
  const pageNumber=req.query.pageNumber;
  let posts;

  if(pageNumber){
     posts = await Post.find().skip((pageNumber - 1) * post_per_page)
    .limit(post_per_page).sort({ createdAt: -1 })
    .populate("user", ["-password"])
    .populate("comments");
  }
  else{
     posts = await Post.find().populate("user", ["-password"])
    .populate("comments");
  }
  
    
  res.status(200).json(posts);
});

/**
 * @desc  count posts
 * @route /api/posts/count
 * @method GET
 * @access public
 */

module.exports.countPostsCtrl = asyncHandler(async (req, res) => {
  const countPosts = await Post.find().countDocuments();

  res.status(200).json({
    status: "success",
    countPosts,
  });
});

/**
 * @desc  get one post
 * @route /api/posts/:id
 * @method GET
 * @access public
 */

module.exports.getOnePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user", [
    "-password",
  ]);
  if (!post) {
    res.status(404).json({
      message: "post not found",
    });
  }
  res.status(200).json({
    status: "success",
    post,
  });
});

/**
 * @desc  delete post
 * @route /api/posts/:id
 * @method DELETE
 * @access private (only admin and the owner of the post )
 */

module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  } else if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);
    
    //remove comments that belong to deleted post
    await Comment.deleteMany({postId:post._id})
    

    res.status(200).json({
      status: "success",
      message: "post has been deleted successfully",
      postId: post._id,
    });
  } else {
    res.status(403).json({
      message: "access denied, forbidden",
    });
  }
});

/**
 * @desc  update post
 * @route /api/posts/:id
 * @method PUT
 * @access private (onlythe owner of the post )
 */

module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  // validation for data
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  // get post from db and check if exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }
  // check if this post belong to logged in user
  else if (req.user.id !== post.user.toString()) {
    return res.status(403).json({
      message: "access denied, you are not allowed",
    });
  }

  //update post

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);


  //send resposne to the client
  res
    .status(200)
    .json({ message: "your post has been updated successfully", updatedPost });
});

/**
 * @desc  upload post image
 * @route /api/posts/upload-image/:id
 * @method PUT
 * @access private (onlythe owner of the post )
 */

module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  // validation image if exist
  if (!req.file) {
    return res.status(400).json({
      message: "no image provided",
    });
  }

  // get post from db and check if exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  // check if this post belong to logged in uer
  else if (req.user.id !== post.user.toString()) {
    return res.status(403).json({
      message: "acces denied, you are not allowed",
    });
  }

  //delete old image
  await cloudinaryRemoveImage(post.image.publicId);

  //upload new photo
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // update the image field in the db

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  //send resposne to the client
  res
    .status(200)
    .json({ message: "your image has been updated successfully", updatedPost });

  fs.unlinkSync(imagePath);
});

/**
 * @desc  toggle like
 * @route /api/posts/like/:id
 * @method PUT
 * @access private (only logged in user )
 */



module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;
  let post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: " post not found" });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );
  }
  res.status(200).json(post);
});
