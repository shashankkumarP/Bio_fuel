const express = require("express");
const jwt = require('jsonwebtoken');
const projectroute = express.Router();
const Projectmodel = require("../model/ProjectSchema");
const Usermodel = require("../model/UserSchema");


projectroute.post("/",async(req,res)=>{ 
    const token = req.headers["authorization"].split(" ")[1];
    let {projectname} = req.body;
    console.log(token);

    if(!token){
        return res.status(401).send({message:"please give token"})
    }
    try{
        const validate = jwt.verify(token,"SECRET11111")
        console.log(validate);
        if(validate){
            const details= jwt.decode(token);
            let email = details.email;
            let user =  await Usermodel.findOne({email:email});
            let project = new Projectmodel({name:projectname,user_id:user._id});
            await project.save();
            return res.status(201).send({message:"new project added"});

            

            
        }else{
            return res.status(403).send({message:"unauthorized"})
        }
    }catch(e){
        return res.status(403).send({message:"unauthorized"})
    }
})





module.exports = projectroute;