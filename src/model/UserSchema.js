const mongo = require("mongoose");



const UserSchema = new mongo.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String,minlength:8},
    
},{
    versionKey:false,
})

const Usermodel = mongo.model('user',UserSchema);
module.exports = Usermodel