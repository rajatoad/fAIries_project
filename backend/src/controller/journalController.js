const express = require('express');
const router = express.Router();

const journalService = require('../service/journalService');

router.post('/', async (req, res) => {
    const {title, content} = req.body;

});

module.exports = router;