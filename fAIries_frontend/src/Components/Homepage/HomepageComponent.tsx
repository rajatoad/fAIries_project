import React, { useContext, useEffect, useState } from 'react'
import JournalComponent from '../Journal/JournalEntryComponent'
import SkillGalleryComponent from '../Skills/SkillGalleryComponent'
import dummySkills from '../../Testing/DummyData'
import type { SkillInterface } from '../Skills/SkillInterface';
import axios from 'axios';
import LoginComponent from '../Login/LoginComponent';
import { UserContext } from '../../Context/UserContext';


interface UserData{
    username: string;
    user_id: string;
}


function HomepageComponent() {

  const userContext = useContext(UserContext);
  const userData = userContext?.userData;

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
          <LoginComponent/>
        )}
    </>
  )
}

export default HomepageComponent