import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { DynamicReferenceService } from './../dynamic-reference.service';
import { FormulaireService } from './../formulaire.service';
import { Formulaire } from './../model/formulaire';
import { QuestionComponent } from './../question/question.component';
import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComposantService } from '../composant.service';
import { DataTypeService } from '../data-type.service';
import { QuestionService } from '../question.service';
import { Question } from '../model/question';

@Component({
  selector: 'questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.css']
})
export class QuestionsFormComponent implements OnInit {

  ngOnInit() {
  }

  questionsForm: QuestionComponent[] = [];
  questionForm: QuestionComponent;
  questions: Question[] = [];
  id: string;
  idForm: string;
  formulaire: Formulaire = new Formulaire();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private composantService: ComposantService,
    private dataTypeService: DataTypeService,
    private questionService: QuestionService,
    private formulaireService: FormulaireService,
    private dynamicReferenceService: DynamicReferenceService,
    private auth: AuthService,
    private userService: UserService) {
    
      this.idForm = this.route.snapshot.paramMap.get('id');
      if (this.idForm){
        this.questionService.getQuestionsByForm(this.idForm)
        .valueChanges()
        .subscribe((questions: Question[]) => {
          this.questions = questions;
          /*if(this.questions){
            for(let q of this.questions){
              this.questionForm = new QuestionComponent(this.router, this.route, this.composantService, this.dataTypeService, this.questionService, this.dynamicReferenceService);
              this.questionForm.question = q;
              q.FormulaireId = this.idForm;
              this.questionsForm.push(this.questionForm);
            }
          }*/
        });

        this.formulaireService.getFormulaire(this.idForm)
        .valueChanges()
        .subscribe((formulaire: Formulaire) => {
          this.formulaire = formulaire;
        });
      }
        
  }

  addQuestion(){
    this.questionForm = new QuestionComponent(this.router, 
      this.route, 
      this.composantService, 
      this.dataTypeService, 
      this.questionService, 
      this.dynamicReferenceService, 
      this.auth, 
      this.userService, 
      this.formulaireService);
      
    this.questionForm.idForm = this.idForm;
    this.questionsForm.push(this.questionForm);
    let question: Question = new Question();
    question.FormulaireId = this.idForm;
    this.questions.push(question);
  }
}
