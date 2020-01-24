import { User } from './user';
import { Domaine } from './domaine';

export class Project{
    Id: number;
    Name: string;
    Description: string;
    Domaine: Domaine;
    DomaineId: number;
    CreePar: User;
    username: string;
    CreeLe: Date;
 }