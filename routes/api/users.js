var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var {UserModel}= require("../../models/userModel");

router.post("/register", async(req, res)=>{
    let user= await UserModel.findOne({email:req.body.email});
    if(user)  return res.status(400).send("User with given email already exist");
     user = new UserModel(); 
     user.name = req.body.name;
     user.email = req.body.email;
     user.password = req.body.password;
     let salt =await bcrypt.genSalt(10);
     user.password= await bcrypt.hash(user.password,salt);
     await user.save();
     return res.send(user);

    });
        
    


module.exports = router;
