const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KY,
    api_secret:process.env.CLOUDINARY_API_SC,

})


// cloudinary upload image

const cloudinaryUploadImage=async (fileToUpload)=>{
    try {
        const data=await cloudinary.uploader.upload(fileToUpload,{
            resource_type:"auto",
        })
        return data;
        
    } catch (error) {
        throw new Error("internal server error (cloudinary)")
    }
}


// cloudinary remove image 
const cloudinaryRemoveImage=async (imagePublicId )=>{
    try {
        const result=await cloudinary.uploader.destroy(imagePublicId)
        return result;
        
    } catch (error) {
        throw new Error("internal server error (cloudinary)")
    }
}



// cloudinary remove multiple image 
const cloudinaryRemoveMultipleImage=async (PublicIds )=>{
    try {
        const result=await cloudinary.v2.api.delete_resources(PublicIds)
        return result;
        
    } catch (error) {
        throw new Error("internal server error (cloudinary)")
    }
}

module.exports={
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
                          
}