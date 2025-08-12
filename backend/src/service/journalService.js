const { v4: uuidv4 } = require('uuid');
// const { GoogleGenAi} = require('@google/genai');
const journalDao = require('../repository/journalDAO');

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY,
// })

async function getJournalById(journalId) {
    try {
        const journal = await journalDao.getItem({ journal_id: journalId });
        if (!journal) {
            return null;
        }
        return journal;
    } catch (error) {
        console.error(`Error fetching journal by ID: ${error}`);
        return null;
    }
}

async function getJournalByUserId(userId) {
    try {
        const journal = await journalDao.getItemsByUserId(userId);
        if (!journal) {
            return null;
        }
        return journal;
    } catch (error) {
        console.error(`Error fetching journal by user ID: ${error}`);
        return null;
    }
}

async function createJournal(journal) {
    if (!journal || !journal.user_id) {
        throw new Error('Invalid journal data');
    }

    journal.journal_id = journal.journal_id || uuidv4(); // Ensure journal_id is set
    journal.entries = journal.entries || [];

    try {
        const result = await journalDao.createItem(journal);
        return result;
    } catch (error) {
        console.error(`Error creating journal: ${error}`);
        throw error;
    }
}

async function createJournalEntry(journal_id, title, content) {
    if (!journal_id || !title || !content) {
        throw new Error('journal_id, title, and content are required');
    }

    try{
        const existingJournal = await getJournalById(journal_id);
        if (!existingJournal) {
            throw new Error('Journal not found');
        }



        existingJournal.entries.push({ title, raw_input: content, processed_input: "", date: new Date().toISOString() });
        return await journalDao.updateItem(existingJournal);
    } catch (error) {
        console.error(`Error checking existing journal: ${error}`);
        throw error;
    }
}

async function processJournalEntry(entry) {

    const response = await ai.models.generateContent({
        model: "gemma-3-12b-it",
        contents: entry
    })

    return response;
}

module.exports = {
    getJournalById,
    getJournalByUserId,
    createJournal,
    createJournalEntry
};