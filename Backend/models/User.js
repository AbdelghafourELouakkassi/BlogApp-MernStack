const mongoose = require("mongoose");
const joi=require("joi");
const passwordComplexity=require("joi-password-complexity")
const jwt = require("jsonwebtoken");


//user schema

const userSchema=new mongoose.Schema({
   username:{
    type:String,
    required:true,
    trim:true,
    minlength:2,
    maxlength:100,
   },
   email:{
    type:String,
    required:true,
    trim:true,
    minlength:5,
    maxlength:100,
    unique:true,
   },
   password:{
    type:String,
    required:true,
    trim:true,
    minlength:8,
   },
   profilePhoto:{
    type:Object,
    default:{
        url:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
        publicId:null
    }
   },
  
   isAdmin:{
    type:Boolean,
    default:false
   },
   isAccountVerified:{
    type:Boolean,
    default:false
   },
   

},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);


// populate posts that belongs to this user when he/she gets his/her posts

userSchema.virtual("posts",{
    ref:"Post",
    foreignField:"user",
    localField:"_id",
})

//generate Auth Token
userSchema.methods.generateAuthToken = function(){
    return jwt.sign({
        id:this._id,
        isAdmin:this.isAdmin,
        username:this.username,
        profilePhoto:this.profilePhoto
    },process.env.JWT_SECRET)

}

//user model
const User=mongoose.model("User",userSchema)


//validation
function validateRegisterUser(obj){
    const schema=joi.object({
        username:joi.string().trim().min(2).max(100).required(),
        email:joi.string().trim().min(5).max(100).required().email(),
        password:passwordComplexity().required(),
    });
    return schema.validate(obj)
}

function validateLoginUser(obj){
    const schema=joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        password:joi.string().trim().min(8).required(),
    });
    return schema.validate(obj)
}
function validateUpdateUser(obj){
    const schema=joi.object({
        username:joi.string().trim().min(2).max(100).required(),
        password:joi.string().trim().min(8).required(),
    });
    return schema.validate(obj)
}




module.exports={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}