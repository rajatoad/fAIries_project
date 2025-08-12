const express = require('express');
const router = express.Router();

const userService = require('../service/userService');
const skillService = require('../service/skillService');
const journalService = require('../service/journalService');

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


router.post('/register', async (req, res) => {
  console.log('Registration request received');
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  try{
    const createdUser = await userService.createUser({ username, password })
    await journalService.createJournal({
      user_id: createdUser.user_id,
      entries: []
    });
    return res.status(201).json(createdUser);
  }catch(err) {
    console.error(`Error during registration: ${err}`);
    return res.status(500).send('Internal server error');
  }
} );

module.exports = router;