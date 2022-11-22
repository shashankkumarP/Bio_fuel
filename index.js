const express = require('express');

const mongoDb = require('mongoose');

const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())

const route = require('./src/route/Signup');
const projectroute = require('./src/route/Project');
const  loginroute  = require('./src/route/Login');
const taskroute = require('./src/route/Task')
const reportingroute = require('./src/route/Reporting');
require('dotenv').config();
const MongodbUrl = process.env.MongoUrl
let port= Number(process.env.port);

app.use(express.urlencoded({extended:true})); 


app.get('/',(req,res)=>res.send('hello'));
app.use("/signup",route);
app.use('/login',loginroute);
app.use('/project',projectroute);
app.use('/task',taskroute);
app.use('/report',reportingroute)

app.listen(port,async()=>{ 
    try {
        await mongoDb.connect(`${MongodbUrl}`)
        console.log("Connected")
    } catch (error) {
        console.log("Connection Error")
    }
})