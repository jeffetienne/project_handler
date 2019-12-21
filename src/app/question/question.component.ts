import { QuestionOptionsComponent } from './../question-options/question-options.component';
import { DynamicReferenceService } from './../dynamic-reference.service';
import { DynamicReference } from './../model/dynamic-reference';
import { Question } from './../model/question';
import { DataType } from './../model/data-type';
import { QuestionService } from './../question.service';
import { DataTypeService } from './../data-type.service';
import { ComposantService } from './../composant.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Composant } from '../model/component';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  composants: Composant[] = [];
  dataTypes: DataType[] = [];
  @Input('question') question: Question;
  name: string;
  description: string;
  idForm: string;
  references: DynamicReference[] = [];
  questionOption: QuestionOptionsComponent;
  //question: Question = new Question();
  constructor(private router: Router,
    private route: ActivatedRoute,
    private composantService: ComposantService,
    private dataTypeService: DataTypeService,
    private questionService: QuestionService,
    private dynamicReferenceService: DynamicReferenceService) { 

      this.composantService.getComponents()
      .subscribe(response => {
        this.composants = response.json();
      });

      this.dataTypeService.getDataTypes()
      .subscribe(response => {
        this.dataTypes = response.json();
      });    
    }

  ngOnInit() {
    if (this.question.Id){
      this.dynamicReferenceService.getDynamicReferencesByQuestion(this.question.Id)
      .subscribe(response => {
        this.references = response.json();
        if (this.references.length > 0){
          this.questionOption = new QuestionOptionsComponent(this.dynamicReferenceService, this.questionService);
        }
      }, error => {
        alert('Unexpected error: ' + error);
      });
    }
  }

  setTitle(input: HTMLInputElement){
    this.name = input.value;
  }

  setMessage(input: HTMLInputElement){
    this.description = input.value;
  }

  save(quest: Question){
    quest.CreePar = 'Concepteur';
    quest.CreeLe = new Date();
    if (!this.question.Id) {
      this.questionService.createQuestion(quest)
        .map(response => response.json())
        .subscribe((response: Question) => {
          this.references.forEach(r => {
            r.CreePar = 'Concepteur';
            r.CreeLe = new Date();
            r.QuestionId = response.Id;
            this.dynamicReferenceService.create(r)
              .subscribe(resp => {
                alert(resp);
              }, error => {
                alert(error);
              });
          });
          this.router.navigate(['/view-formulaire/' + quest.FormulaireId]);
        }, error => {
          alert('An unexpected error: ' + error);
        });
    }
    else{
      this.question.Formulaire = null;
      this.question.Composant = null;
      this.question.DataType = null;
      this.questionService.updateQuestion(this.question.Id.toString(), this.question);
      this.router.navigate(['/view-formulaire/' + quest.FormulaireId]);
    }
    
  }

  getSelectedValue(){
    if (this.question.ComponentId == 2 || this.question.ComponentId == 3 || this.question.ComponentId == 4){
      this.questionOption = new QuestionOptionsComponent(this.dynamicReferenceService, this.questionService);
    }
    else{
      this.questionOption = null;
    }
  }

  deleteQuestion(){
    if(this.question.Id){
      this.questionService.delete(this.question.Id.toString());
      this.router.navigate(['/view-formulaire/' + this.question.FormulaireId]);
    }
    else{}
  }
}
