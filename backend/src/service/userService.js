const uuid = require('uuid');
const userDAO = require('../repository/userDAO');
const skillDAO = require('../repository/skillDAO');
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
        return user.user_skills;
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

async function createUser(user) {
    try{
        const transformedUser = {
            username: user.username,
            password: user.password,
            user_id: uuid.v4(),
            user_skills: []
        }

        userDAO.createItem(transformedUser);
        return transformedUser;
    }catch(error) {
        console.error("Error creating item:", error);
        throw error;
    }

}


async function addSkillToUser(userId, skillId) {
    try{
        const skill = await skillDAO.getItem({ skill_id: skillId });
        const user = await getUserById(userId);

        user.user_skills.push({skill_exp: 0, skill_id: skill.skill_id, skill_tasks: []});
        await userDAO.updateItem(user);
        return user;
    }catch(error){
        console.error(`Error adding skill to user: ${error}`);
        throw error;
    }
}

module.exports = {
  loginUser,
  createUser,
  getUserById,
  getUserSkills,
  addSkillToUser
};