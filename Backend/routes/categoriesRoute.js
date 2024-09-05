const { createCategoryCtrl,deleteCategoryCtrl,getAllCategoriesCtrl} = require("../controllers/categoriesController");
const {verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { validateObjectId } = require("../middlewares/validateObjectId");
const router = require("express").Router();



//api/categories

router.route("/").post(verifyTokenAndAdmin,createCategoryCtrl)
.get(getAllCategoriesCtrl);


//api/categories/:id
router.route("/:id").delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryCtrl)





module.exports=router