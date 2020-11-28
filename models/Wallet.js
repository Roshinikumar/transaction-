const mongoose = require("mongoose")
const Schema = mongoose.Schema;
 var WalletSchema= new Schema({
    
    user_id: {
         type: Schema.Types.ObjectId,
         ref: 'User' 
    },
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
   
    currency:{
        type:String,
        required:true
    },
   
    createdTime:{
        type:Date,
        Default:Date.now

    }
})

module.exports=mongoose.model("wallet",WalletSchema);