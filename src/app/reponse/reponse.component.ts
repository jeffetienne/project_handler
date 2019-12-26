import { ReponseService } from './../reponse.service';
import { Question } from './../model/question';
import { Reponse } from './../model/reponse';
import { Component, OnInit, Input } from '@angular/core';
import { DynamicReference } from '../model/dynamic-reference';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';
import { DynamicReferenceService } from '../dynamic-reference.service';

@Component({
  selector: 'reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {

  @Input('reponse') reponse: Reponse = new Reponse();
  @Input('question') question: Question;

  references: DynamicReference[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private reponseService: ReponseService,
    private questionService: QuestionService,
    private dynamicReferenceService: DynamicReferenceService) {



  }

  ngOnInit() {
    if (this.question) {
      this.dynamicReferenceService.getDynamicReferencesByQuestion(this.question.Id)
        .subscribe(response => {
          this.references = response.json();
          if(this.references){
            //alert('hello');
          }
        }, error => {
          alert('Unexpected error: ' + error);
      });
    }
  }

}
