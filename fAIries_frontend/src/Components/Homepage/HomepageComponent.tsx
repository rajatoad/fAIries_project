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
    user_skills: SkillInterface[]; 
}


function HomepageComponent() {

  let [userData, setUserData] = useState<UserData | undefined>(undefined);

  // useEffect(() => {
  //   let url = `http://localhost:3000/skills`;
  //   axios.get(url).then((response) => setSkills(response.data));
  // }, []);

  return (
    <>
        <h1>Welcome to the Homepage</h1>
        { userData ? (

          <><JournalComponent /><SkillGalleryComponent skills={userData.user_skills} /></>

        ): (
          <LoginComponent setUserData={setUserData}/>
        )}
    </>
  )
}

export default HomepageComponent