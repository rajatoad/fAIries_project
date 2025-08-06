import type { TaskInterface } from "./Tasks/TaskInterface";

export interface SkillInterface {
    id: string;
    name: string;
    url: string;
    exp: number;
    type: string;
    tasks: TaskInterface[]
}