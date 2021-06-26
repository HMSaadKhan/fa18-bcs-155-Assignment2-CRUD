var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
var UserSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password : String, 
    Role:{
        type: String,
        default: "user",

    },
});
UserSchema.methods.generateHashedPassword=  async function(){
    let salt =await bcrypt.genSalt(10);
     this.Password= await bcrypt.hash(this.Password,salt);
}
var User = mongoose.model("User",UserSchema); 
function validateUserSignup(data){
    const schema = Joi.Object({
        Name: Joi.string().min(3).max(10).required(),
        Email: Joi.string().email().min(3).max(10).required(),
        Password: Joi.string().min(8).required(),
    });
    return schema.validate(data,{abortEarly:false});

}
function validateUserSignin(data){
    const schema = Joi.Object({
        Name: Joi.string().min(3).max(10).required(),
        Email: Joi.string().email().min(3).max(10).required(),
        Password: Joi.string().min(8).required(),
    });
    return schema.validate(data,{abortEarly:false});

}



module.exports.UserModel = User;
module.exports.validateSignin = validateUserSignin;
module.exports.validateSignup = validateUserSignup;
