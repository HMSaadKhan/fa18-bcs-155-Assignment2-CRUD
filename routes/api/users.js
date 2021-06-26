var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const config = require  ('config');
var jwt = require('jsonwebtoken');
const  _ =require('lodash');
var {UserModel}= require("../../models/userModel");

router.post("/register", async(req, res)=>{
    let user= await UserModel.findOne({Email:req.body.Email});
    if(user)  return res.status(400).send("User with given email already exist");
     user = new UserModel(); 
     user.Name = req.body.Name;
     user.Email = req.body.Email;
     user.Password = req.body.Password;
     await user.generateHashedPassword();    
     
     await user.save();
     return res.send(_.pick(user,["name","email"]));

    });
    router.post("/login", async(req, res)=>{
        let user= await UserModel.findOne({Email:req.body.Email});
        if(!user)  return res.status(400).send("User not exist");
        let isValid= await bcrypt.compare(req.body.Password,user.Password);
        if(!isValid)  return res.status(400).send("wrongPassword");
        let token= jwt.sign(
            {_id: user._id, Name:user.Name, Role:user.Role},
            config.get("jwtPrivateKey"));  
        return res.send(token);
    
        });     

        router.get("/", async(req, res)=>{
            let data = await UserModel.find();
            return res.send(data)
        })
        
    


module.exports = router;
