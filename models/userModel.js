var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const Joi = require('@hapi/joi');
var UserSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password : String 
});
UserSchema.methods.generateHasedPassword =  async function(){
    let salt =await bcrypt.genSalt(10);
     user.password= await bcrypt.hash(user.password,salt);
}
var User = mongoose.model("User",UserSchema); 
function validateUserSignup(data){
    const schema = Joi.Object({
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().min(3).max(10).required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data,{abortEarly:false});

}
function validateUserSignin(data){
    const schema = Joi.Object({
        name: Joi.string().min(3).max(10).required(),
        Email: Joi.string().email().min(3).max(10).required(),
        password: Joi.string().min(8).required(),
    });
    return schema.validate(data,{abortEarly:false});

}



module.exports.user = User;
module.exports.validateSignin = validateUserSignin;
module.exports.validateSignup = validateUserSignup;
