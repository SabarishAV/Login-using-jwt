const express = require('express');
const mongoose = require("mongoose")
const path = require('path');
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const validateToken = require("../middleware/validateToken")




const app = express()
const router = express.Router();
app.use(cookieParser())

router.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, '../views/login.html'));
})

router.post("/login",async (req,res)=>{
    try{
        const userData = await mongoose.connection.db.collection("users").find().toArray();
        // console.log(userData);
        const { username,password } = req.body;
        const user = userData.find(obj=>obj.username==username)
        if(user){
            if(password === user.password){
                res.status(200)
                console.log("user verified")
                const payload = {
                    userId : user._id,
                    username : user.username
                }
                console.log(payload);
                const jwtToken = jwt.sign(payload,process.env.JWT_SECRET_KEY,{ expiresIn:"15m" })
                res.cookie('jwtToken', jwtToken, {
                    httpOnly: true,
                    secure: true, // Only set secure to true if your website uses HTTPS
                    maxAge: 1000 * 60 * 15, // Expires in 15 min
                  });
                res.redirect("/protected");
                
                
            }else{
                res.status(400)
            throw new Error("username or password is incorrect")
            }
        }else{
            res.status(404)
            throw new Error("User not found")
        }
    }
    catch(e){
        console.error(e)
    }
})

router.get('/protected',validateToken,(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/protected.html'));
})


module.exports = router;