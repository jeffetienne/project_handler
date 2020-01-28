import { QuestionService } from './../question.service';
import { DynamicReferenceService } from './../dynamic-reference.service';
import { DynamicReference } from './../model/dynamic-reference';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.css']
})
export class QuestionOptionsComponent implements OnInit {

  @Input('references') references: DynamicReference[] = [];
  @Input('reference') reference: DynamicReference = new DynamicReference();
  references$;
  idQuestion: number;

  constructor(private dynamicReferenceService: DynamicReferenceService, questionService: QuestionService) { 
    //this.getDynamicReferences();
  }

  getDynamicReferences(){
    if(this.idQuestion)
      this.references$ = this.dynamicReferenceService.getDynamicReferencesByQuestion(this.idQuestion.toString());
      this.references$
      .subscribe((references: DynamicReference[]) => {
        this.references = references;
        this.reference = this.references[0];
        
      }, error => {
        alert('Error: ' + error);
      });
  }

  saveDynamicReference(reference){
    this.dynamicReferenceService.create(reference);
  }

  removeReference(reference){
    let pos = this.references.indexOf(reference);
    this.references.splice(pos, 1);
  }

  addDynamic(code: HTMLInputElement, texte: HTMLInputElement){
    this.reference = new DynamicReference();
    this.reference.Code = code.value;
    this.reference.Texte = texte.value;
    this.references.push(this.reference);
    code.value = '';
    texte.value = '';
  }

  ngOnInit() {
  }

}
