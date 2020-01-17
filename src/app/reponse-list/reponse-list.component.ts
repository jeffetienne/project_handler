import { ReponseForm } from './../model/reponse-form';
import { DynamicReferenceService } from './../dynamic-reference.service';
import { Formulaire } from './../model/formulaire';
import { RequestMethod } from '@angular/http';
import { Reponse } from './../model/reponse';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormulaireService } from '../formulaire.service';
import { QuestionService } from '../question.service';
import { ReponseService } from '../reponse.service';
import { Question } from '../model/question';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'reponse-list',
  templateUrl: './reponse-list.component.html',
  styleUrls: ['./reponse-list.component.css']
})
export class ReponseListComponent implements OnInit {

  idForm;
  questions: Question[] = [];
  reponses: Reponse[] = [];
  reponsesForm: ReponseForm[] = [];
  keyValueRep = {};
  keyValueRepHeader = {};
  keyValueReponses = [];
  formulaire: Formulaire = new Formulaire();
  keyDescOrder;

  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private questionService: QuestionService,
    private ynamicReferenceService: DynamicReferenceService,
    private reponseService: ReponseService) { 

      this.idForm = this.route.snapshot.paramMap.get('id');

      if(this.idForm){
        formulaireService.getFormulaire(this.idForm)
        .subscribe(response =>{
          this.formulaire = response.json();
        });
        this.reponseService.getReponsesByFormulaires(this.idForm)
        .subscribe(response => {
          this.reponsesForm = response.json();
          
          if (this.reponsesForm.length > 0) {
            let nombreQuestions: number = 0
            let questionId: string = this.reponsesForm[0].QuestionId;


            this.reponsesForm.forEach(r => {

              if (r.QuestionId == questionId) {

                nombreQuestions++;
              }
            });
            
            let nbreQuestions = Math.floor(this.reponsesForm.length / nombreQuestions);
            let reste = this.reponsesForm.length%nombreQuestions;

            let groupe = this.reponsesForm[0].Groupe;
            let currentGroupe: number = 0;
            this.reponsesForm.forEach(r => {

              currentGroupe = r.Groupe;
              if(groupe == currentGroupe){
                this.keyValueRepHeader[r.Question.Name] = r.Valeur;
                this.keyValueRep[r.Question.Name] = r;
              }
              else{
                this.keyValueReponses.push(this.keyValueRep);
                this.keyValueRep = {};
                groupe = currentGroupe;
                this.keyValueRepHeader[r.Question.Name] = r.Valeur;
                this.keyValueRep[r.Question.Name] = r;
              }
            });
            
            this.keyValueReponses.push(this.keyValueRep);

            let KeyValueMax;

            for(let compteur: number = 0; compteur < this.keyValueReponses.length; compteur++)
            {
              for(let j: number = compteur + 1; j < this.keyValueReponses.length; j++){
                if(Object.keys(this.keyValueReponses[compteur]).length < Object.keys(this.keyValueReponses[j]).length)
                  KeyValueMax = this.keyValueReponses[j]
              }

            }
            
            let n: number = 0;
            for(let k in KeyValueMax){
              let value: ReponseForm = KeyValueMax[k];
              n++;
              for(let compteur: number = 0; compteur < this.keyValueReponses.length; compteur++)
              {
                if(n > Object.keys(this.keyValueReponses[compteur]).length){
                  let val: ReponseForm = new ReponseForm();
                  let q: Question = new Question();
                  q.ComponentId = value.Question.ComponentId;
                  val.Question = q;
                  val.Texte = 'NA';
                  val.Valeur = 'NA';
                  this.keyValueReponses[compteur][value.Question.Name] = val;
                  
                }
              }
            }
            /*
            for (let compteur: number = 0; compteur < this.reponsesForm.length; compteur++) {
              
              this.keyValueRepHeader[this.reponsesForm[compteur].Question.Name] = this.reponsesForm[compteur].Valeur;
              if(this.reponsesForm[compteur].Question.ComponentId == 2 || this.reponsesForm[compteur].Question.ComponentId == 3)
              {
                this.keyValueRep[this.reponsesForm[compteur].Question.Name] = this.reponsesForm[compteur];
              }else{
                this.keyValueRep[this.reponsesForm[compteur].Question.Name] = this.reponsesForm[compteur];
              }

              if (compteur > 0 && (compteur + 1) % nbreQuestions == 0) {
                this.keyValueReponses.push(this.keyValueRep);
                this.keyValueRep = {};
              }
            }*/
          }        
        });
        /*/
        questionService.getQuestionsByForm(this.idForm)
        .subscribe(response => {
          this.questions = response.json();
          let rep: Reponse[] = []
          
          
          this.questions.forEach(q => {
            this.reponseService.getReponsesByQuestion(q.Id)
            .subscribe(response => {
              rep = response.json();
              //console.log(rep)
              
              //this.reponses.push(rep);
              
              let i: number = 0;
              for(let compteur: number = 0; compteur < rep.length; compteur++){
                this.keyValueRep[rep[compteur].Question.Name] = rep[compteur].Valeur;
                console.log(this.keyValueRep);
                break;
              }
              if(Object.keys(this.keyValueRep).length == this.questions.length){
                this.keyValueReponses.push(this.keyValueRep)
                
              
              }
              
              
              
            });
            
          });
          //console.log(this.keyValueReponses);
        });//*/
        
      }
    }

  ngOnInit() {
  }

  returnZero() {
    return 0
  }

}