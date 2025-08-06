const skillDao = require('../repository/skillDAO');

async function getSkillById(skillId) {
  try {
    const skill = await skillDao.getItem({ skill_id: skillId });
    if (!skill) {
      return null;
    }
    console.log(skill)
    return skill;
  } catch (error) {
    console.error(`Error fetching skill by ID: ${error}`);
    return null;
  }
}

async function createSkill(skill) {
  try {
    const result = await skillDao.createItem(skill);
    return result;
  } catch (error) {
    console.error(`Error creating skill: ${error}`);
    throw error;
  }
}

module.exports = {
  getSkillById,
  createSkill
};