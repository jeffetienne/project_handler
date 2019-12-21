import { Project } from './project';
import { FormType } from './form-type';
export class Formulaire{
    Id: number;
    Name: string;
    Description: string;
    FormType: FormType;
    FormTypeId: number;
    Project: Project;
    ProjectId: number;
    CreePar: string;
    CreeLe: Date
}