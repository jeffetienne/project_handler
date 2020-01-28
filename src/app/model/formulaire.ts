import { User } from './user';
import { Project } from './project';
import { FormType } from './form-type';
export class Formulaire{
    Id: number;
    name: string;
    description: string;
    FormType: FormType;
    FormTypeId: number;
    Projet: Project;
    ProjectId: number;
    CreePar: User;
    username: string;
    CreeLe: Date
}