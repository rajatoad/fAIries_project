import React, { useState } from 'react'
import type { SkillInterface } from './SkillInterface';
import SkillComponent from './SkillComponent';

function SkillGalleryComponent({skills}: {skills: SkillInterface[]}) {

  return (
    <>
    {
        skills?.map((skill: SkillInterface) => {
            return <SkillComponent key={skill.skill_id} skill={skill}/>
        })
    }
    </>
  )
}

export default SkillGalleryComponent;