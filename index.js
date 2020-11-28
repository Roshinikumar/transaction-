const express = require("express")
const app = express();
const mongoose = require("mongoose")
const infoRouter = require("./router");
var path = require("path");
var bodyparser = require('body-parser')

// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 


//ejs

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');



//Db connection
mongoose.connect("mongodb://localhost:27017/trans", { useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
    if(!err){
        console.log("connected successfully")
    } else{
        console.log("not connected")
    }
})

//router
app.use("/",infoRouter)


//listen port
app.listen(5000,()=>{
    console.log("server started")
})