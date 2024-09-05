const asyncHandler = require("express-async-handler");

const {Category,validateCreateCategory}=require("../models/Category")





/**
 * @desc create new category
 * @route /api/categories/
 * @method POST
 * @access private (only admin)
 */


module.exports.createCategoryCtrl=asyncHandler(async(req,res)=>{
    const {error}=validateCreateCategory(req.body)
    if(error){
        return res.status(400).json({
            message:error.details[0].message
        })
    }

    const category=await Category.create({
        user:req.user.id,
        title:req.body.title
      });

    res.status(201).json(category) 
    
})


/**
 * @desc delete category
 * @route /api/categories/:id
 * @method DELETE
 * @access private (only admin)
 */


module.exports.deleteCategoryCtrl=asyncHandler(async(req,res)=>{

    const category=await Category.findById(req.params.id)

    if(!category){
        return res.status(404).json({
            message:"categoory not found"
        })
    }
    else{
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"category has been deleted successfully"}) 
    }

    
})


/**
 * @desc get All categories
 * @route /api/categories/
 * @method GET
 * @access public 
 */


module.exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories=await Category.find();
    
    if(!categories){
      return res.status(404).json({
        message:"there are no categories "
      })
    }
  
    res.status(200).json(categories)
    
  })