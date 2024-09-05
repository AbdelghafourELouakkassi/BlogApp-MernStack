const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const uploadPhoto = require("../middlewares/uploadPhoto");
const { validateObjectId } = require("../middlewares/validateObjectId");
const {
  createPostCtrl,
  getAllPostsCtrl,
  getOnePostCtrl,
  countPostsCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
} = require("../controllers/postsController");

// /api/posts/
router
  .route("/")
  .post(verifyToken, uploadPhoto.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(countPostsCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getOnePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);

// update post image /api/posts/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    uploadPhoto.single("image"),
    updatePostImageCtrl
  );

// toggle like for post /api/posts/like/:id
router
  .route("/like/:id")
  .put(validateObjectId, verifyToken,toggleLikeCtrl);

module.exports = router;
