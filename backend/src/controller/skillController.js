const express = require('express');
const router = express.Router();

const skillService = require('../service/skillService');
const userService = require('../service/userService');

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try{
        const userSkills = await userService.getUserSkills(userId);
        if (!userSkills) {
            return res.status(200).json([]);
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

router.post('/', async (req, res) => {
    const skillData = req.body;
    console.log(skillData);
    if (!skillData || !skillData.skill_name || !skillData.skill_url || !skillData.type || !skillData.user_id) {
        return res.status(400).send('Invalid skill data');
    }
    try {
        const skillDataWithoutUserId = {
            skill_name: skillData.skill_name,
            skill_url: skillData.skill_url,
            type: skillData.type,
        };
        const newSkill = await skillService.createSkill(skillDataWithoutUserId);
        userService.addSkillToUser(skillData.user_id, newSkill.skill_id);
        return res.status(201).json(newSkill);
    } catch (error) {
        console.error(`Error creating skill: ${error}`);
        return res.status(500).send('Internal server error');
    }
});


module.exports = router;
