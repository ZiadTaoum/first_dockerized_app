const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

const PORT = 5000;
const MONGO_URL = 'mongodb://mongo:27017/usersdb';

// Connect to MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create a simple User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Seed some users
app.get('/api/seed', async (req, res) => {
  const users = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' }
  ];
  await User.insertMany(users);
  res.send('Users added successfully');
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend with nodemon!!!!!' });
});

// API route to fetch users from MongoDB
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// API route to add a new user
app.post('/api/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });
  await newUser.save();
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
