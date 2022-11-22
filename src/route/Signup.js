const express = require('express');
const argon = require('argon2');
const Usermodel = require("../model/UserSchema")
const route = express.Router();


route.post("/",async(req,res)=>{
    let {email,name,password} = req.body;

    if(!email||!name||!password){
        return res.status(400).send({message:"please fill form"})
    }
    let pass = await argon.hash(password);
    let newuser = new Usermodel({name:name,email:email,password:pass});
    await newuser.save();
    return res.status(201).send({message:"user created"})
})



module.exports= route

