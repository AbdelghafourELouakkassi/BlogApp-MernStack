const mongoose = require("mongoose");
const joi=require("joi");



const categorySchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  title:{
    type:String,
    required:true,
  },

    
 
 },{timestamps:true}
);



 //category model

 const Category=mongoose.model("Category",categorySchema)

 //validation

 function validateCreateCategory(obj){
    const schema=joi.object({
        title:joi.string().trim().required()
    });
    return schema.validate(obj)
 }



 module.exports={
    Category,
    validateCreateCategory
 }

