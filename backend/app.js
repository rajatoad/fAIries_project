const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const userController = require('./src/controller/userController');

app.use(cors());
app.use(express.json());

app.use('/users', userController);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/skills', (req, res) => {
  console.log('Fetching skills data');

  res.json(skills);
})

let skills = [
  {
    id: "skill-1",
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    exp: 10,
    type: "Programming Language",
    tasks: [
      {
        id: "task-1-1",
        name: "Learn Advanced Types",
        description: "Master conditional types, mapped types, and template literal types",
        reward: 50,
        difficulty: "Hard",
        status: "in progress"
      },
      {
        id: "task-1-2",
        name: "Build TypeScript Project",
        description: "Create a small application using TypeScript best practices",
        reward: 30,
        difficulty: "Medium",
        status: "not started"
      },
      {
        id: "task-1-3",
        name: "Type Declaration Files",
        description: "Write custom type declarations for a JavaScript library",
        reward: 40,
        difficulty: "Hard",
        status: "completed"
      }
    ]
  },
  {
    id: "skill-2",
    name: "React",
    url: "https://reactjs.org",
    exp: 49,
    type: "Frontend Framework",
    tasks: [
      {
        id: "task-2-1",
        name: "Learn Hooks",
        description: "Understand useState, useEffect, and custom hooks",
        reward: 35,
        difficulty: "Medium",
        status: "completed"
      },
      {
        id: "task-2-2",
        name: "Context API",
        description: "Implement global state management using Context",
        reward: 25,
        difficulty: "Medium",
        status: "in progress"
      },
      {
        id: "task-2-3",
        name: "Performance Optimization",
        description: "Apply memoization and code splitting",
        reward: 45,
        difficulty: "Hard",
        status: "not started"
      },
      {
        id: "task-2-4",
        name: "Build Todo App",
        description: "Create a CRUD application with React",
        reward: 20,
        difficulty: "Easy",
        status: "completed"
      }
    ]
  }
];


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