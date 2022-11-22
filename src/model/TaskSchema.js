const mongo = require("mongoose");


const TaskSchema = new mongo.Schema({
    
    project_id:{
        type:mongo.Schema.Types.ObjectId,
        ref:'project'

    },
    name:{type:String},
    date:{type:String,required:true}
    
})
const Taskmodel = mongo.model('task',TaskSchema);
module.exports = Taskmodel;