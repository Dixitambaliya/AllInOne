const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://cal:cal111@cal.aorvb.mongodb.net/");

const userSchema = mongoose.Schema({
    email:String,
    password:String,
});

module.exports = mongoose.model('user',userSchema);