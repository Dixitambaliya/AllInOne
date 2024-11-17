const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const isAuthenticated = require('./middleware/authMiddleware');
require('dotenv').config();

const secretkey = process.env.JWT_SECRET || "asdfghjkl";  
const userModel = require('./models/userModel');
const Result = require('./models/resultModel');

// Configure CORS to allow cookies
app.use(cors({
  origin: 'https://allinone-1.onrender.com',
  credentials: true
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Server Is Running");
});

// Register route
app.post("/api/register", async (req, res) => {
  try {
      const { email, password } = req.body;

      const existingUser = await userModel.findOne({ email });
      if (existingUser) return res.status(400).json({ error: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new userModel({
          email,
          password: hashedPassword,
      });
      await user.save();

      const token = jwt.sign({ email: user.email, userid: user._id }, secretkey, { expiresIn: '1h' });

      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
        });
      return res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ email: user.email, userid: user._id }, secretkey, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });

    return res.json({ message: "Logged in successfully", token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Logout route
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
  res.json({ message: 'Logged out successfully' });
});

// Protected routes
app.use('/api/protected', isAuthenticated);

app.get('/api/protected/home', (req, res) => {
  res.json({ message: 'Welcome to the protected home page', user: req.user });
});

// Profile route
app.get('/api/profile', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userid;
    const user = await userModel.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
