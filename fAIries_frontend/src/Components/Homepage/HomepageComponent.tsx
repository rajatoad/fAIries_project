import React, { useContext, useEffect, useState } from 'react'
import JournalComponent from '../Journal/JournalEntryComponent'
import SkillGalleryComponent from '../Skills/SkillGalleryComponent'
import dummySkills from '../../Testing/DummyData'
import type { SkillInterface } from '../Skills/SkillInterface';
import axios from 'axios';
import LoginComponent from '../Login/LoginComponent';
import { UserContext } from '../../Context/UserContext';
import RegisterComponent from '../Register/RegisterComponent';
import SkillManagerComponent from '../Skills/SkillManager/SkillManagerComponent';


interface UserData{
    username: string;
    user_id: string;
}


function HomepageComponent() {

  const userContext = useContext(UserContext);
  const userData = userContext?.userData;

  return (
    <>
        <h1>Welcome to the Homepage</h1>
        { userData ? (

          <>
            <JournalComponent />
            <SkillManagerComponent />
          </>

        ): (
          <>
            <LoginComponent/>
            <RegisterComponent/>
          </>
        )}
    </>
  )
}

export default HomepageComponent