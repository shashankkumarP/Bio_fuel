const express = require('express');
const reportingroute = express.Router();
const jwt = require('jsonwebtoken');
const Projectmodel = require('../model/ProjectSchema');
const Taskmodel = require('../model/TaskSchema');
const Usermodel = require('../model/UserSchema');



reportingroute.get("/",async(req,res)=>{
    const token = req.headers["authorization"].split(" ")[1];
    let {projectname,date,month,year} = req.body;
  
    
    
    let da =date+"-"+month+"-"+year;
   


    if(!token){
        return res.status(401).send({message:"please give token"})
    }
    
    try{
        const validate = jwt.verify(token,"SECRET11111")
        console.log(validate);
        if(validate){
            const details= jwt.decode(token);
            let d =  await Projectmodel.findOne({name:projectname}).populate('user_id');
            
            if(d.user_id.email==details.email){
                let d1 =  await Projectmodel.findOne({name:projectname})
                let task = await Taskmodel.aggregate([{$match:{project_id:d1._id}},{$match:{date:da}}])
                

                 
                return res.status(200).send(task);
            }else{
                return res.status(403).send({message:"unauthorized"})
            }
            
            

            

            
        }
    }catch(e){
        return res.status(400).send({message:"unauthorized"})
    }
})


module.exports = reportingroute;