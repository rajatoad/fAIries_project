import React, { useState } from 'react'
import type { TaskInterface } from './TaskInterface'

function TaskComponent({task, completeTask, startTask}: {task: TaskInterface, completeTask: any, startTask: any}) {

    function taskButton() {
        if(task.status === "in progress"){
            completeTask(task);
        }else{
            startTask(task);
        }
    }

  return (
    <>
        {task.status === "completed" ? 
            <></> 
            :
            <>
                <h1>{task.name}</h1>
                <p>{task.description}</p>
                <h3>{task.reward}</h3>
                <h4>{task.id}</h4>
                <h4>{task.difficulty}</h4>
                <h4>{task.status}</h4>
                <button onClick={taskButton}>{task.status === "not started" ? "Start" : "Complete"}</button>
            </>
        }
    </>

  
  )
}

export default TaskComponent