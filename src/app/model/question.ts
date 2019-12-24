import { Formulaire } from './formulaire';
import { DataType } from './data-type';
import { Composant } from './component';

export class Question{
    Id: number;
    Name: string;
    Description: string;
    Formulaire: Formulaire;
    FormulaireId: string;
    Composant: Composant;
    ComponentId: number;
    DataType: DataType;
    TypeDonneeId: number;
    Minimum: number;
    Maximum: number;
    Required: boolean;
    CreePar: string;
    CreeLe: Date;
}