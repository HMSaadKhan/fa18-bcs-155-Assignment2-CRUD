var mongoose = require('mongoose');
const Joi = require('@hapi/joi');
var UserSchema = mongoose.Schema({
    Name: String,
    Email: String,
    Password : String 
});

function validateUserSignup(data){
    const schema = Joi.Object({
        name: Joi.string().min(3).max(10).required(),
        Email: Joi.string().email().min(3).max(10).required(),
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
var User = mongoose.model("User",UserSchema);
module.exports.user = User;
module.exports.validateSignin = validateUserSignin;
module.exports.validateSignup = validateUserSignup;
