import React, { useState } from 'react'
import type { TaskInterface } from './TaskInterface'

function TaskComponent({task, completeTask, startTask}: {task: TaskInterface, completeTask: any, startTask: any}) {

    function taskButton() {
        if(task.task_status === "in progress"){
            completeTask(task);
        }else{
            startTask(task);
        }
    }

  return (
    <>
        {task.task_status === "completed" ? 
            <></> 
            :
            <>
                <h1>{task.task_name}</h1>
                <p>{task.task_description}</p>
                <h3>{task.task_exp}</h3>
                <h4>{task.task_status}</h4>
                <button onClick={taskButton}>{task.task_status === "not started" ? "Start" : "Complete"}</button>
            </>
        }
    </>

  
  )
}

export default TaskComponent