import { User } from './user';
import { DynamicReference } from './dynamic-reference';
import { Question } from './question';
export class Reponse{
    Id: number;
    Groupe: number;
    Valeur: string;
    Question: Question;
    QuestionId: string;
    Reference: DynamicReference;
    CreePar: User;
    CreeLe: Date;
}