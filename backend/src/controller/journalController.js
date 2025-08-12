const express = require('express');
const router = express.Router();

const journalService = require('../service/journalService');

router.put('/entry', async (req, res) => {
    const {title, content, journal_id} = req.body;

    try{
        await journalService.createJournalEntry(journal_id, title, content)
        res.status(201).send('Journal entry created successfully');
    }catch(error) {
        console.error(`Error creating journal entry: ${error}`);
        res.status(500).send('Internal Server Error');
    }

});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const journal = await journalService.getJournalByUserId(userId);
        if (!journal) {
            const newJournal = await journalService.createJournal({ user_id: userId });
            return res.status(201).json(newJournal);
        }
        res.status(200).json(journal);
    } catch (error) {
        console.error(`Error fetching journal by user ID: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:journalId', async (req, res) => {
    const journalId = req.params.journalId;
    try {
        const journal = await journalService.getJournalById(journalId);
        if (!journal) {
            return res.status(404).send('Journal not found');
        }
        res.status(200).json(journal);
    } catch (error) {
        console.error(`Error fetching journal by ID: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const { user_id } = req.body;
    try {
        const journal = await journalService.createJournal({ user_id, entries: [] });
        res.status(201).json(journal);
    } catch (error) {
        console.error(`Error creating journal: ${error}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;