const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const userSchema = mongoose.Schema({
    email:String,
    password:String,
});

module.exports = mongoose.model('user',userSchema);