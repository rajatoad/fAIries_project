const express = require('express');
const router = express.Router();

const userService = require('../service/userService');
const skillService = require('../service/skillService');

// GET user by ID

router.post('/login', async (req, res) => {
  console.log('Login request received');
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try{
    const user = await userService.loginUser(username, password);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }else{

        return res.status(200).json(user);
    }

        
  }catch(err) {
    console.error(`Error during login: ${err}`);
    return res.status(500).send('Internal server error');
  }
});


router.post('/register', (req, res) => {
  console.log('Registration request received');
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).send('Username, password, and email are required');
  }
  userService.createItem({ username, password })
    .then(() => {
        console.log(`User registered: ${username}`);
        res.status(201).send('Registration successful');
    } )
    .catch(err => {
        console.error(`Error during registration: ${err}`);
        res.status(500).send('Registration failed');
    });
} );

module.exports = router;