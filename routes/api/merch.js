var express = require('express');
var router = express.Router();
var {MerchModelData}= require("../../models/productModel");
var validateProduct= require("../../middlewares/validateProducts");
var auth= require("../../middlewares/auth");
router.get("/",auth, async(req, res)=>{
    let data = await MerchModelData.find();
    return res.send(data)
})

//get single merch
router.get("/:id", async(req, res)=>{
    try {
     let data = await MerchModelData.findById(req.params.id);
     if(!data)
      return res.status(400).send("Product not found");
     return res.send(data)  
    } catch (error) {
        return res.status(400).send("Invalid ID");
        
    } 
 })
 //update
 router.put("/:id", async(req, res)=>{
     try {
      let data = await MerchModelData.findById(req.params.id);
      data.Name = req.body.Name;
      data.Anime = req.body.Anime;
      data.Type = req.body.Type;
      await data.save();
      if(!data)
       return res.status(400).send("Product not found");
      return res.send(data)  
     } catch (error) {
         return res.status(400).send("Invalid ID");
         
     } 
  })
 
 //delte
 router.delete("/:id", async(req, res)=>{
     try {
      let data = await MerchModelData.findByIdAndDelete(req.params.id); 
      if(!data)
       return res.status(400).send("Product not found");
      return res.send(data)  
     } catch (error) {
         return res.status(400).send("Invalid ID");
         
     } 
  })
 //insert
 router.put("/", async(req, res)=>{
      let data = new MerchModelData();
      data.Name = req.body.Name;
      data.Anime = req.body.Anime;
      data.Type = req.body.Type;
      await data.save();
      
      return res.send(data)  
     
  })
 
 
 
 module.exports = router;
 
