import React, { useContext, useEffect, useState } from 'react'
import SkillGalleryComponent from '../SkillGalleryComponent'
import type { SkillInterface } from '../SkillInterface';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import CreateSkillComponent from '../CreateSkill/CreateSkillComponent';

function SkillManagerComponent() {

    const userContext = useContext(UserContext);
    const userData = userContext?.userData;

    let [userSkills, setUserSkills] = useState<SkillInterface[]>([]);


    useEffect(() => {
        if(!userData) return;
        let url = `http://localhost:3000/skills/${userData.user_id}`;

        axios.get(url).then((response: {data: any}) => {
            setUserSkills(response.data);
        });

    }, []);

    return (
        <>
            <h1>Skill Manager</h1>
            <SkillGalleryComponent skills={userSkills}/>
            <CreateSkillComponent/>
        </>
    )
}

export default SkillManagerComponent