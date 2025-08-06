const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const userController = require('./controller/userController');
const skillController = require('./controller/skillController');

app.use(cors());
app.use(express.json());

app.use('/users', userController);
app.use('/skills', skillController);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/journal', (req, res) => {
  console.log('Journal entry received');
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  } 
  console.log(`Title: ${title}`);
  console.log(`Content: ${content}`);
  res.status(201).send('Journal entry created');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});