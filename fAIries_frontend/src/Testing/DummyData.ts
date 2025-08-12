import type { SkillInterface } from "../Components/Skills/SkillInterface";

export const dummySkills: SkillInterface[] = [
  {
    skill_id: "skill-1",
    skill_name: "TypeScript",
    skill_url: "https://www.typescriptlang.org",
    skill_exp: 10,
    skill_type: "Programming Language",
    skill_tasks: [
      {
        task_name: "Learn Advanced Types",
        task_description: "Master conditional types, mapped types, and template literal types",
        task_exp: 50,
        task_status: "in progress"
      },
      {
        task_name: "Build TypeScript Project",
        task_description: "Create a small application using TypeScript best practices",
        task_exp: 30,
        task_status: "not started"
      },
      {
        task_name: "Type Declaration Files",
        task_description: "Write custom type declarations for a JavaScript library",
        task_exp: 40,
        task_status: "completed"
      }
    ]
  }
  // {
  //   id: "skill-2",
  //   name: "React",
  //   url: "https://reactjs.org",
  //   exp: 49,
  //   type: "Frontend Framework",
  //   tasks: [
  //     {
  //       id: "task-2-1",
  //       name: "Learn Hooks",
  //       description: "Understand useState, useEffect, and custom hooks",
  //       reward: 35,
  //       difficulty: "Medium",
  //       status: "completed"
  //     },
  //     {
  //       id: "task-2-2",
  //       name: "Context API",
  //       description: "Implement global state management using Context",
  //       reward: 25,
  //       difficulty: "Medium",
  //       status: "in progress"
  //     },
  //     {
  //       id: "task-2-3",
  //       name: "Performance Optimization",
  //       description: "Apply memoization and code splitting",
  //       reward: 45,
  //       difficulty: "Hard",
  //       status: "not started"
  //     },
  //     {
  //       id: "task-2-4",
  //       name: "Build Todo App",
  //       description: "Create a CRUD application with React",
  //       reward: 20,
  //       difficulty: "Easy",
  //       status: "completed"
  //     }
  //   ]
  // }
];

export default dummySkills;