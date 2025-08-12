import axios from 'axios';
import React, { useContext } from 'react'
import { UserContext } from '../../../Context/UserContext';

function CreateSkillComponent() {

    const userContext = useContext(UserContext);
    const userData = userContext?.userData;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(event.target as HTMLFormElement);
        axios.post('http://localhost:3000/skills', {
            user_id: userData?.user_id,
            skill_name: formData.get('skillName'),
            skill_type: formData.get('skillType'),
            skill_url: formData.get('skillUrl'),
        })
        .then(response => {
            console.log('Skill created successfully:', response.data);
            formData.delete('skillName');
            formData.delete('skillType');
            formData.delete('skillUrl');
        })
        .catch(error => {
            console.error('There was an error creating the skill!', error);
        });

    }
  return (
    <>
        <h1>Create Skill Component</h1>
        <p>This component will allow users to create a new skill.</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="skillName">Skill Name:</label>
            <input type="text" id="skillName" name="skillName" required />
            <br />
            <label htmlFor="skillType">Skill Type:</label>
            <input type="text" id="skillType" name="skillType" required />
            <br />
            <label htmlFor="skillUrl">Skill URL:</label>
            <input type="url" id="skillUrl" name="skillUrl" required />
            <br />
            <button type="submit">Create Skill</button>
        </form>
    </>
  )
}

export default CreateSkillComponent