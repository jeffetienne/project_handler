import { Question } from './question';

export class ReponseForm{
    Id: number;
    Valeur: string;
    Question: Question;
    QuestionId: string;
    ReferenceId: number;
    Code: string;
    Texte: string;
    CreePar: string;
    CreeLe: Date;
}