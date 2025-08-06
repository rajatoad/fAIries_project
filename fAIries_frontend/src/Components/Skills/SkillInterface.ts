import type { TaskInterface } from "./Tasks/TaskInterface";

export interface SkillInterface {
    skill_id: string;
    skill_name: string;
    skill_url: string;
    skill_exp: number;
    skill_type: string;
    skill_tasks: TaskInterface[]
}