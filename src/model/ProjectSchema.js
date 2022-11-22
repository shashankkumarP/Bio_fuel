const mongo = require("mongoose");


const ProjectSchema = new mongo.Schema({ 
    name:{type:String,required:true,unique:true},
    user_id:{
        type:mongo.Schema.Types.ObjectId,
        ref:'user'
    },
    
},{
   versionKey:false,
});

const Projectmodel = mongo.model("project",ProjectSchema);
module.exports= Projectmodel;


