
const userDAO = require('../repository/userDAO');
const skillService = require('./skillService');


async function loginUser(username, password){
    try{
        const user = await userDAO.findUserByUsernameAndPassword(username, password);
        if (!user) {
            return null
        }
          user.password = undefined; // Remove password from response
        //   console.log(user);
        if (user.user_skills && user.user_skills.length > 0) {
            for(let i = 0; i < user.user_skills.length; i++) {
                const skill = await skillService.getSkillById(user.user_skills[i].skill_id);
                console.log(skill);
                if (skill) {
                    // user.user_skills[i].skill_url = skill.skill_url;
                    // user.user_skills[i].skill_name = skill.skill_name;
                    // user.user_skills[i].skill_type = skill.type;

                    user.user_skills[i] = {
                        ...user.user_skills[i],
                        skill_url: skill.skill_url,
                        skill_name: skill.skill_name,
                        skill_type: skill.type,
                    };
                }
        }
        // console.log(user);
        return user;
    }
}catch(error) {
      console.error(`Error during login: ${err}`);
      return null;
    }
    return null;
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
  createItem
};