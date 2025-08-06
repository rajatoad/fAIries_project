import { useState } from 'react'
import TaskComponent from './Tasks/TaskComponent'
import type { TaskInterface } from './Tasks/TaskInterface'
import type { SkillInterface } from './SkillInterface'
import { getLevelProgress } from './SkillService';


function SkillComponent({skill, viewTask=true}: {skill:SkillInterface, viewTask?: boolean}) {

    let [viewTasks, setViewTasks] = useState<boolean>(viewTask);

    let [skillState, setSkillState] = useState<SkillInterface>(skill);

    let tasksView = skill.tasks.map((item: TaskInterface) => {
                    return item.status === "completed" ? <></> : <TaskComponent task={item} completeTask={completeTask} startTask={startTask}/>
                })
    
    function completeTask(task: TaskInterface){
        let taskIndex = skillState.tasks.indexOf(task);
        let newTasks = skillState.tasks;
        newTasks[taskIndex] = task;
        task.status = "completed";
        setSkillState({...skillState, exp: skillState.exp + task.reward, tasks: newTasks });
        console.log(skillState)
    }

    function startTask(task: TaskInterface){
        let taskIndex = skillState.tasks.indexOf(task);
        let newTasks = skillState.tasks;
        newTasks[taskIndex] = task;
        task.status = "in progress";
        setSkillState({...skillState, tasks: newTasks });
        console.log(skillState)
    }

    let levelProgress : {
        level: number;
        currentXp: number;
        xpToNextLevel: number;
        progressPercentage: number;
    } = getLevelProgress(skillState.exp);

  return (
    <>
        <h1>{skillState.name}</h1>
        <h3>{skillState.type}</h3>
        <h3>{skillState.url}</h3>
        <h4>{skillState.id}</h4>

        <h4>Experience: {skillState.exp}</h4>
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