const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    createdTime:{
        type:Date,
        Default:Date.now

    }
})

module.exports=mongoose.model("users",UserSchema);