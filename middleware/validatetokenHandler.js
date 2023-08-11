const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const validateTokenHandler=asyncHandler(async (req, res, next) => {
    
    const token=req.headers.authorization.split(" ")[1];
    if(!token) {
        res.status(401).json({error: "Not Authorized, No token"});
        throw new Error("Not Authorized, No token");
    }
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    req.user=await User.findById(decoded._id);
    next();
})

module.exports=validateTokenHandler;