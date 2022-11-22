const express = require("express");
const loginroute = express.Router();
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const Usermodel = require("../model/UserSchema")

loginroute.post("/",async(req,res)=>{
   
        const {email,password}= req.body; 
        if(!email||!password){
            res.status(400).send({message:"please fill the form"})
        }
        const user = await Usermodel.findOne({email:email});
        console.log("user",user)
        if(!user){
            return res.status(401).send({message:"user not authorized"});
        }
        const verify = await argon2.verify(user.password,password);
        console.log(verify,"verify hash");
        
        
        if(user&&verify){
            const token = jwt.sign({id:user._id,email:user.email},"SECRET11111",{expiresIn:"30m"})
            
           return res.status(200).send({message:"found user successfully",token:token})
        }
        return res.status(401).send("Unauthorize");
    
    

})

module.exports = loginroute;
