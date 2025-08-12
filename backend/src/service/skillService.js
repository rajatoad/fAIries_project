const uuid = require('uuid');
const skillDao = require('../repository/skillDAO');

async function getSkillById(skillId) {
  try {
    const skill = await skillDao.getItem({ skill_id: skillId });
    if (!skill) {
      return null;
    }
    return skill;
  } catch (error) {
    console.error(`Error fetching skill by ID: ${error}`);
    return null;
  }
}

async function createSkill(skill) {
  try {
    skill = {
      ...skill,
      skill_id: uuid.v4(),
    }
    const result = await skillDao.createItem(skill);
    return skill;
  } catch (error) {
    console.error(`Error creating skill: ${error}`);
    throw error;
  }
}

module.exports = {
  getSkillById,
  createSkill
};