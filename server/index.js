const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CodeSnip Server is running!');
});
const snippets = [
  { id: 1, title: 'Array forEach example', language: 'JavaScript' },
  { id: 2, title: 'Python list comprehension', language: 'Python' },
  { id: 3, title: 'Java for loop', language: 'Java' },
];

app.get('/snippets', (req, res) => {
  res.json(snippets);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});