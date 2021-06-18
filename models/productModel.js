var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    Name: String,
    Anime: String,
    Type : String 
});

var Product = mongoose.model("data",productSchema);
module.exports = Product;
