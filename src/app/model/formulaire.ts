import { User } from './user';
import { Project } from './project';
import { FormType } from './form-type';
export class Formulaire{
    Id: number;
    Name: string;
    Description: string;
    FormType: FormType;
    FormTypeId: number;
    Projet: Project;
    ProjectId: number;
    CreePar: User;
    CreeLe: Date
}