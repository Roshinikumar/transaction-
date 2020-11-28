const mongoose = require("mongoose")
const Schema = mongoose.Schema;
 var transactionSchema= new Schema({
    
    user_id: {
         type: Schema.Types.ObjectId,
         ref: 'users' 
    },
    amount:{
        type:Number,
        required:true
    },
   
    currency:{
        type:String,
        required:true
    },
    type:{
       type:String,
    },
    from:{
        type:String
        
    },
    to:{
        type:String
        
    },
    createdTime:{
        type:Date,
        Default:Date.now

    }
})

module.exports=mongoose.model("transaction",transactionSchema);