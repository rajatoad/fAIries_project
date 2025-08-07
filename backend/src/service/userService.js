
const userDAO = require('../repository/userDAO');
const skillService = require('./skillService');


async function loginUser(username, password){
    try{
        const user = await userDAO.findUserByUsernameAndPassword(username, password);
        if (!user) {
            return null
        }
          return {username: user.username, user_id:user.user_id};
        }catch(error) {
        console.error(`Error during login: ${err}`);
        return null;
    }
}

async function getUserSkills(userId){
    try{
        const user = await getUserById(userId);
        if (user.user_skills && user.user_skills.length > 0) {
            for(let i = 0; i < user.user_skills.length; i++) {
                const skill = await skillService.getSkillById(user.user_skills[i].skill_id);
                if (skill) {
                    user.user_skills[i] = {
                        ...user.user_skills[i],
                        skill_url: skill.skill_url,
                        skill_name: skill.skill_name,
                        skill_type: skill.type,
                    };
                }
        }
        return user.user_skills;;
        }}catch(error) {
        console.error(`Error transforming user skills: ${error}`);
        return null;
    }

}

async function getUserById(userId) {
    try {
        const user = await userDAO.getItem({ user_id: userId });
        if (!user) {
            return null;
        }  
        user.password = undefined; // Remove password from response
        return user;
    } catch (error) {
        console.error(`Error fetching user by ID: ${error}`);
        return null;
    }
}

function createItem(item) {
    try{
        userDAO.createItem(item);
    }catch(error) {
        console.error("Error creating item:", error);
        throw error;
    }

}

module.exports = {
  loginUser,
  createItem,
  getUserById,
  getUserSkills
};