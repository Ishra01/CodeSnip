const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('Error:', err));

const snippetSchema = new mongoose.Schema({
  title: String,
  language: String,
  code: String,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

app.get('/snippets', async (req, res) => {
  const snippets = await Snippet.find();
  res.json(snippets);
});

app.post('/snippets', async (req, res) => {
  const snippet = new Snippet(req.body);
  await snippet.save();
  res.json(snippet);
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.json({ message: 'User registered successfully!' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found!' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Wrong password!' });
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1d' });
  res.json({ token });
});
app.delete('/snippets/:id', async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Snippet deleted!' });
});
app.put('/snippets/:id', async (req, res) => {
  const snippet = await Snippet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(snippet);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});