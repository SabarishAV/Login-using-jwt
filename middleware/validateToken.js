const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next)=>{
    let token = req.cookies.jwtToken;
    if(!token){
        res.redirect("/login")
    }else{
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(400).redirect("/login")
                throw new Error("User is unauthorized")
            }
            next()
        })
    }
})

module.exports = validateToken