const express = require('express');
require('./Db/config');
const app = express();
const cors = require('cors'); /// for cors policy issue
const jwt = require('jsonwebtoken'); // for validation of user

 const jwtKey = 'e-comm';



 app.use(express.json());
 app.use(cors());
const User = require("./Db/User"); // connect db 

const Product = require("./Db/Product");

app.post("/register",async (req,resp) =>{
    let user = new User(req.body); // new user
    let result = await user.save(); // what save in the db
  result =  result.toObject();
 delete result.password;
 jwt.sign({result},jwtKey,{expiresIn: "2h"}, (err,token)=>{
    if(err){
        resp.send({result : "No User Found plewase try again "});

    } 
    resp.send({result,auth:token});
   
})
})

app.post("/login", async (req,resp)=>{
    if(req.body.password && req.body.email){
     let user = await User.findOne(req.body).select("-password");
     if(user){
        // add jwt token
        jwt.sign({user},jwtKey,{expiresIn: "2h"}, (err,token)=>{
            if(err){
                resp.send({result : "No User Found plewase try again "});

            } 
            resp.send({user,auth:token});
           
        })
   
}else{
    resp.send("No User Found");

}

    }else{
        resp.send("password to dal le bhai")
    }
})

app.post("/add-product",async (req,resp)=>{

 
let product  = new Product(req.body);
let result = await product.save(); // what save in the db

resp.send(result);


})
// const connectDB = async () =>{
//     mongoose.connect('mongodb://localhost:27017');

//     const productSchema =new mongoose.Schema({});
//  const product = mongoose.model('product', productSchema);
//  const data = await product.find();
//  console.warn(data);
// }
// connectDB();
// app.get("/",(req,resp)=>{
//  resp.send("app is working");


// });


// get product data
app.get("/products",async (req,resp)=>{

let products = await  Product.find(); // get all data
 if(products.length > 0){
    resp.send(products);
 }else{
    resp.send({result: "no products found"});
 }

})

app.delete("/products/:id", async(req,resp)=>{

const result = await Product.deleteOne({_id:req.params.id});

resp.send(result);

})
app.get("/products/:id",async (req,resp)=>{

 const result = await Product.findOne({_id:req.params.id});
 if(result){
    resp.send(result);
 }else{
    resp.send({result: "result not found"});
 }

})


// update product api
app.put("/products/:id", async (req,resp)=>{
    const result = await Product.updateOne({_id:req.params.id},{$set : req.body})

 resp.send(result);

})

// search values 
app.get("/search/:key", async (req,resp)=>{

    let result = await Product.find({
        "$or" : [
            {name : {$regex : req.params.key}},
            {company : {$regex : req.params.key}},
            {category : {$regex : req.params.key}}

        ]
    });
   resp.send(result);
   })



app.listen(5000);