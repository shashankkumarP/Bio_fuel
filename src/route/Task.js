const express = require("express");
const jwt = require('jsonwebtoken');
const taskroute = express.Router();
const Projectmodel = require("../model/ProjectSchema");
// const Usermodel = require("../model/UserSchema");
const Taskmodel = require("../model/TaskSchema");


taskroute.post("/",async(req,res)=>{ 
    const token = req.headers["authorization"].split(" ")[1];
    let {projectname,taskname} = req.body;
    console.log(token);

    if(!token){
        return res.status(401).send({message:"please give token"})
    }
    try{
        const validate = jwt.verify(token,"SECRET11111")
        console.log(validate);
        if(validate){
            
            let project = await Projectmodel.findOne({name:projectname});
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth()+1;
            let date = today.getDate();
            let d =date+"-"+month+"-"+year;
            console.log(d);
            let newtask = new Taskmodel({project_id:project._id,name:taskname,date:d})
            await newtask.save();
            return res.status(201).send({message:"new task added"});

            

            
        }else{
            return res.status(403).send({message:"unauthorized"})
        }
    }catch(e){
        return res.status(403).send({message:"unauthorized"})
    }
})





module.exports = taskroute;