import React, { useEffect, useState } from 'react'
import JournalComponent from '../Journal/JournalComponent'
import SkillGalleryComponent from '../Skills/SkillGalleryComponent'
import dummySkills from '../../Testing/DummyData'
import type { SkillInterface } from '../Skills/SkillInterface';
import axios from 'axios';
import LoginComponent from '../Login/LoginComponent';


interface UserData{
    username: string;
    user_id: string;
}


function HomepageComponent() {

  let [userData, setUserData] = useState<UserData | undefined>(undefined);
  let [userSkills, setUserSkills] = useState<SkillInterface[] | undefined>(undefined);

  useEffect(() => {
    if(!userData) return;
    let url = `http://localhost:3000/skills/${userData.user_id}`;
    axios.get(url).then((response: {data: SkillInterface[]}) => {
      setUserSkills(response.data);
    });
  }, [userData]);

  return (
    <>
        <h1>Welcome to the Homepage</h1>
        { userData && userSkills ? (

          <><JournalComponent /><SkillGalleryComponent skills={userSkills} /></>

        ): (
          <LoginComponent setUserData={setUserData}/>
        )}
    </>
  )
}

export default HomepageComponent