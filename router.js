var express=require("express"); 
const router=express.Router();
var app=express();
const mongoose = require('mongoose');
var userInfo=require('./models/User.js');
var transDet = require('./models/transaction.js')
var bodyparser = require('body-parser');
const Wallet = require("./models/Wallet.js");
var ObjectId = require('mongodb').ObjectId 
const { check, validationResult } 
    = require('express-validator');
// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

//user
router.get('/users',function (req, res) {
    var result;
    userInfo.find({},function(err,result){
    //  console.log(result,'true')
    res.render('pages/users',{result:result});
    //req.session.errors = null;
  });
});

//createuser
router.get('/createuser',function(req,res){
    var result;
    userInfo.find({},function(err,result){
     console.log(result,'createuser')
    res.render('pages/createuser',{result:result});
    //req.session.errors = null;
  }); 
})
 
    
//createuser post method
router.post('/createuser',function(req,res){
  console.log(req.body);
var user= new userInfo({
     name    : req.body.name,
     mobile  : req.body.mobile,
     email : req.body.email,
     type   : req.body.type,
     
   });
 user.save({});



   var wallet= new Wallet({
     user_id : user._id, 
     name    : req.body.name,
     amount: 0,
     currency:'DOLLAR',
       })
   wallet.save({});
   var wallet= new Wallet({
     user_id : user._id, 
     name    : req.body.name,
     amount: 0,
     currency:'INR',
       })
     
 wallet.save(function(err,result){
            if(err){
               console.log('sucess')
            }else{
               res.redirect('/users')
            }
     })

 });
    




//withdraw & deposit
//withdraw 
router.get('/transaction/(:id)',function (req, res) {
   
    var result;
    var o_id = new ObjectId(req.params.id)
      //console.log(o_id,'hello')
    userInfo.find({"_id": o_id },function(err,result){
     console.log(result[0]._id,'')
    res.render('pages/transaction',{result:result});
  
  });
});



// post
router.post('/transaction/(:id)',function(req,res){
    console.log(req.body,'hiii');
   
    var o_id = new ObjectId(req.params.id)
            
      
    var transaction =new transDet({
        user_id:o_id, 
        amount : req.body.amount,
        currency   : req.body.currency,
        type   : req.body.type,
        
      })
    
     
      
     if(req.body.type=='deposit') {
         console.log(o_id,"iddd");
          
        
         Wallet.findOne({"user_id": o_id , "currency" :req.body.currency },function(err,result){
          console.log(result,'successfully')

            // var admin = 2*(req.body.amount)/100
             
            var adminpercent =parseInt (2*req.body.amount)/100;
            var amt =req.body.amount-adminpercent;
            var bal = parseInt(result.amount)+amt
           
          


            // var newbalance = parseInt(req.body.amount)
            // var bal  =  parseInt(result.amount )
            // var balance = newbalance+bal
            

         console.log(bal,'deposited')
        var update= {
            user_id:o_id,
            amount :  bal,   
            
       }
          
          Wallet.update({ "user_id":o_id, "currency":req.body.currency }, { $set : update}, function (err, result){
                   console.log(result,'deopsited..')
                   
          })  

          userInfo.find({'type':'admin'},function(err,result){
            console.log(result,'adminnnnn')
            console.log(err,'not an admin')
            
            var admin= {
              user_id:o_id,
              amount :adminpercent ,   
              
         }
            console.log(adminpercent,'hghghghg')
            
            Wallet.update({  "user_id": ObjectId("5fb7903e5a2e3e345f673158"), "currency":req.body.currency }, { $set : admin}, function (err, result){
                     console.log(result,'admin percent')
                     
            })  

             
          })
         

           
        })
       
        
     }else{

        console.log("withdraw");

        
        Wallet.findOne({"user_id": o_id , "currency" :req.body.currency },function(err,result){
          console.log(result,'successfully')
      
            
           if(result.amount>=req.body.amount)   {
            console.log('you can withdraw')
           
            var newbalance = parseInt(result.amount)
            var bal  =  parseInt(req.body.amount )
            var balance = newbalance - bal

         console.log(balance,'withdraw')
        var update= {
            user_id:o_id,
            amount :  balance,   

       }
          
          Wallet.update({ "user_id":o_id, "currency":req.body.currency }, { $set : update}, function (err, result){
                   console.log(result,'withdraw')
                   
          })  
        } 
       else{
         console.log('insufficient balance')
                      }

        })
      
     }
     

      transaction.save(function(err, doc){
         console.log(err,'transaction complete')
        if(err){
           console.log('sucess')
        }else{
            // console.log('transaction')
            res.redirect('/users');
        }
   });
})







module.exports=router;




// var user_id = '5eb985d440bd2155e4d788e2'; 
// User.findByIdAndUpdate(user_id, { name: 'Gourav' }, 
//                             function (err, docs) { 
//     if (err){ 
//         console.log(err) 
//     } 
//     else{ 
//         console.log("Updated User : ", docs); 
//     } 
// }); 