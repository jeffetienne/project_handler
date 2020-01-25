import { User } from './user';
import { Question } from './question';

export class DynamicReference{
    Id: number;
    Code: string;
    Texte: string;
    Question: Question;
    QuestionId: string;
    CreePar: User;
    CreeLe: Date;
}