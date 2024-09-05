const jwt = require("jsonwebtoken");



//middleware to verify token if exist for every request

function verifyToken(req,res,next){
    const authToken=req.headers.authorization
    if(authToken){
        try {
            const token=authToken.split(" ")[1]
            let decodedPayload=jwt.verify(token,process.env.JWT_SECRET)
            req.user=decodedPayload;
            next();
        } 
        catch (error) {
            return res.status(401).json({message:"invalid token,access denied"})
        }
        
    }else{
        return res.status(401).json({messge:"no token provided,access denied"})
    }

} 


//verify token and only admin himself can access to this

function verifyTokenAndAdmin(req,res, next){
   verifyToken(req,res, ()=>{
    if(req.user.isAdmin){
       next()       
    }
    else{
        return res.status(403).json({message:"you are not allowed to access this route only admin can"})
    }
})
}

//verify token and only user himself can access to this

function verifyTokenAndUser(req,res, next){
   verifyToken(req,res, ()=>{
    if(req.user.id===req.params.id){
       next()       
    }
    else{
        return res.status(403).json({message:"you are not allowed to access this, only user himself"})
    }
})
}



function verifyTokenAndAuthorization(req,res, next){
   verifyToken(req,res, ()=>{
    if(req.user.id===req.params.id || req.user.isAdmin){
       next()       
    }
    else{
        return res.status(403).json({message:"not allowed to access this, only user himself or admin can"})
    }
})
}

module.exports={
    verifyTokenAndAdmin,verifyToken,verifyTokenAndUser,
    verifyTokenAndAuthorization
}