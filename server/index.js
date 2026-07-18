const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('Error:', err));

// Snippet Model
const snippetSchema = new mongoose.Schema({
  title: String,
  language: String,
  code: String,
});

const Snippet = mongoose.model('Snippet', snippetSchema);

// Routes
app.get('/snippets', async (req, res) => {
  const snippets = await Snippet.find();
  res.json(snippets);
});

app.post('/snippets', async (req, res) => {
  const snippet = new Snippet(req.body);
  await snippet.save();
  res.json(snippet);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});