import { useState } from 'react'
import TaskComponent from './Tasks/TaskComponent'
import type { TaskInterface } from './Tasks/TaskInterface'
import type { SkillInterface } from './SkillInterface'
import { getLevelProgress } from './SkillService';


function SkillComponent({skill, viewTask=true}: {skill:SkillInterface, viewTask?: boolean}) {

    let [viewTasks, setViewTasks] = useState<boolean>(viewTask);

    let [skillState, setSkillState] = useState<SkillInterface>(skill);

    let tasksView = skill.skill_tasks.map((item: TaskInterface, index: number) => {
                    return item.task_status === "completed" ? <></> : <TaskComponent key={index} task={item} completeTask={completeTask} startTask={startTask}/>
                })
    
    function completeTask(task: TaskInterface){
        let taskIndex = skillState.skill_tasks.indexOf(task);
        let newTasks = skillState.skill_tasks;
        newTasks[taskIndex] = task;
        task.task_status = "completed";
        setSkillState({...skillState, skill_exp: skillState.skill_exp + task.task_exp, skill_tasks: newTasks });
        console.log(skillState)
    }

    function startTask(task: TaskInterface){
        let taskIndex = skillState.skill_tasks.indexOf(task);
        let newTasks = skillState.skill_tasks;
        newTasks[taskIndex] = task;
        task.task_status = "in progress";
        setSkillState({...skillState, skill_tasks: newTasks });
        console.log(skillState)
    }

    let levelProgress : {
        level: number;
        currentXp: number;
        xpToNextLevel: number;
        progressPercentage: number;
    } = getLevelProgress(skillState.skill_exp);

  return (
    <>
        <h1>{skillState.skill_name}</h1>
        <h3>{skillState.skill_type}</h3>
        <h3>{skillState.skill_url}</h3>
        <h4>{skillState.skill_id}</h4>

        <h4>Experience: {skillState.skill_exp}</h4>
        <p>
            Level: {levelProgress.level},
            currentXp: {levelProgress.currentXp},
            xpToNextLevel: {levelProgress.xpToNextLevel},
            progress: {levelProgress.progressPercentage}
        </p>


        <button onClick={() => setViewTasks(!viewTasks)}>Tasks</button>

        {viewTasks ? <></>: tasksView}

    </>
  )
}

export default SkillComponent