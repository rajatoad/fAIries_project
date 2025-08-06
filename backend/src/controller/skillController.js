const express = require('express');
const router = express.Router();

const skillService = require('../service/skillService');
const userService = require('../service/userService');

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try{
        const userSkills = await userService.getUserSkills(userId);
        if (!userSkills) {
            return res.status(404).send('User skills not found');
        }
        return res.status(200).json(userSkills);
    }catch(err){
        console.error(`Error fetching user skills: ${err}`);
        return res.status(500).send('Internal server error');
    }
})

router.get('/:skillId', async (req, res) => {
    const skillId = req.params.skillId;
    try {
        const skill = await skillService.getSkillById(skillId);
        if (!skill) {
            return res.status(404).send('Skill not found');
        }
        return res.status(200).json(skill);
    } catch (error) {
        console.error(`Error fetching skill by ID: ${error}`);
        return res.status(500).send('Internal server error');
    }
});


module.exports = router;
