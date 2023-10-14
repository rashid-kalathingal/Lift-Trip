const jwt = require('jsonwebtoken')
const User =require('../models/User')

const verifyToken = async(req,res,next)=>{
    if(!req.headers.authorization) return res.status(403).json({msg:"Not autorized. No token"})

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(" ")[1]
        //console.log(token)
        try {
            const payload =jwt.verify(token, process.env.JWT_SECRET)
         //console.log(payload,";;shbgsh");
         if(payload.role!=='user'){
            return res.status(404).json({message :'User not available'}) 
         }
         const user= await User.findById(payload.id)
         if(user && user.isBlocked){
            return res.status(404).json({message :'User is Blocked'})
         }
         next()
        } catch (error) {
            console.log(error);
            return res.status(403).json({msg: "Wrong or expired token"})
        }
        

        // jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
        //     if(err) return res.status(403).json({msg: "Wrong or expired token"})
        //     console.log(data,";;;;;");
        //         req.user = data //an object with the user id as its only property
        //         next()
            
        // })
    }
}

module.exports = verifyToken;