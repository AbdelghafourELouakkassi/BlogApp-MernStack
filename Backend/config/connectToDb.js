const mongoose = require("mongoose");

module.exports=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to MongoDB")
        
    } catch (error) {
        console.log("Connection failed to MongoDb",)
        
    }
}