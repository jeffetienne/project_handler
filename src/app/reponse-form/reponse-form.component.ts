import { ReponseForm } from './../model/reponse-form';
import { FormulaireService } from './../formulaire.service';
import { Formulaire } from './../model/formulaire';
import { Question } from './../model/question';
import { ReponseService } from './../reponse.service';
import { ReponseComponent } from './../reponse/reponse.component';
import { Component, OnInit } from '@angular/core';
import { Reponse } from '../model/reponse';
import { Router, ActivatedRoute } from '@angular/router';
import { ComposantService } from '../composant.service';
import { DataTypeService } from '../data-type.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'reponse-form',
  templateUrl: './reponse-form.component.html',
  styleUrls: ['./reponse-form.component.css']
})
export class ReponseFormComponent implements OnInit {

  reponsesForm: ReponseFormComponent[] = [];
  reponseForm: ReponseComponent;
  reponses: Reponse[] = [];
  questions: Question[] = [];
  id: string;
  idForm: string;
  formulaire: Formulaire = new Formulaire();
  reponse: ReponseForm;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private questionService: QuestionService,
    private reponseService: ReponseService) { 

      this.idForm = this.route.snapshot.paramMap.get('id');

      if (this.idForm){
        this.formulaireService.getFormulaire(this.idForm)
        .valueChanges()
        .subscribe((formulaire: Formulaire) => {
          this.formulaire = formulaire;
        });
        this.questionService.getQuestionsByForm(this.idForm)
        .subscribe(respone => {
          this.questions = respone.json();
          this.questions.forEach(q => {
            let r = new Reponse()
            r.QuestionId = q.Id.toString();
            r.Question = q;
            this.reponses.push(r);
          });
        });
      }
    }

  ngOnInit() {
  }

  create(){
    if(this.reponses){
      this.reponseService.getMaxGroupe()
      .subscribe(response => {
        this.reponse = response.json();

        this.reponses.forEach(r => {
          r.Question = null;

          r.Groupe = this.reponse.Groupe + 1;
          r.CreeLe = new Date();
          r.CreePar = 'Concepteur';
          
          this.reponseService.create(r)
          .subscribe(response => {
            
          }, error => {
            alert('Unexpected error: ' + error);
          });
        });

      },error => {
          alert('Unexpected error: ' + error);
      });

      
    }
  }

  valueChange(questionId){
    this.reponses.forEach(r => {
      if(r.QuestionId == questionId){
        r.CreeLe = new Date();
        r.CreePar = 'Concepteur';
      }
    });
  }

}
