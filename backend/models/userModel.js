// Import and configure dotenv to load environment variables
require('dotenv').config();
const mongoose = require('mongoose');

// Use the MONGO_URI environment variable
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB using the URI from .env
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define your schema
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Add validation rules
    password: { type: String, required: true }, // Add validation rules
});

// Export the model
module.exports = mongoose.model('User', userSchema); // Capitalize model name for consistency
