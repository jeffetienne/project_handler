import { Formulaire } from './../model/formulaire';
import { FormulaireService } from './../formulaire.service';
import { User } from './../model/user';
import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
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
import { DatePipe } from '@angular/common';
import { typeSourceSpan } from '@angular/compiler';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  composants: Composant[] = [];
  dataTypes: DataType[] = [];
  composants$;
  typeDonnees$;
  @Input('question') question: Question;
  @Input('QuestionId') QuestionId: string;
  name: string;
  description: string;
  idForm: string;
  references: DynamicReference[] = [];
  references$;
  questionOption: QuestionOptionsComponent;
  hidden: boolean = true;
  pipe: any;
  isCollapsed
  //question: Question = new Question();
  constructor(private router: Router,
    private route: ActivatedRoute,
    private composantService: ComposantService,
    private dataTypeService: DataTypeService,
    private questionService: QuestionService,
    private dynamicReferenceService: DynamicReferenceService,
    private auth: AuthService,
    private userService: UserService,
    private formulaireService: FormulaireService) { 

      this.composants$ = this.composantService.getComponents();
      

      this.typeDonnees$ = this.dataTypeService.getDataTypes();    
    }

  ngOnInit() {
    if (this.QuestionId){
      if(this.question.TypeDonneeId == 1){
        this.hidden = false;
      }
      else{
        this.hidden = true;
      }
      this.references$ = this.dynamicReferenceService.getDynamicReferencesByQuestion(this.QuestionId);
      this.references$.subscribe((references: DynamicReference[]) => {
        this.references = references;
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
    this.idForm = this.route.snapshot.paramMap.get('id');
    this.auth.user$
    .subscribe(u => {
      this.userService.get(u.uid)
      .valueChanges()
      .subscribe((user: User) => {
        let now = Date.now();
        this.pipe = new DatePipe('en-US');
        let myFormattedDate = this.pipe.transform(now, 'short');
        quest.CreePar = user;
        this.question.CreePar = user;
        quest.CreeLe = myFormattedDate;
        this.question.CreeLe = myFormattedDate;
        if(!quest.Minimum) {
          quest.Minimum =0;
          this.question.Minimum = 0;
        }
        this.question.Minimum = quest.Minimum;
        if(!quest.Maximum) {
          quest.Maximum =0;
          this.question.Maximum = 0;
        }
        this.question.Maximum = quest.Maximum;
        if(!quest.Required) {
          quest.Required = false;
          this.question.Required = false;
        }
        this.question.Required = quest.Required;
        quest.Id = "0";
        
        this.formulaireService.getFormulaire(this.idForm)
        .valueChanges()
        .subscribe((form: Formulaire) => {
          quest.Formulaire = form;
          this.question.Formulaire = form;
          this.composantService.getComponent(quest.ComponentId.toString())
          .valueChanges()
          .subscribe((component: Composant) => {
            quest.Composant = component;
            this.question.Composant = component;
            this.dataTypeService.getDataType(quest.TypeDonneeId.toString())
            .valueChanges()
            .subscribe((type: DataType) => {
              quest.DataType = type;
              this.question.DataType = type;
              let ref = this.questionService.createQuestion(quest);
              if(ref){
                this.questionService.getQuestion(ref.key)
                .valueChanges()
                .subscribe((question: Question) => {
                  question.Id = ref.key;
                  this.questionService.updateQuestion(ref.key, question);
                  
                });
                this.question.Id = ref.key;
                this.references.forEach(r => {
                  r.CreePar = user;
                  r.CreeLe = myFormattedDate;
                  r.QuestionId = this.question.Id;
                  r.Question = this.question;
                  this.dynamicReferenceService.create(r);
                });
              }

            });
          });
        });
      });
    });
    /*
    if (!this.question.Id) {
      this.questionService.createQuestion(quest)
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
    }//*/
    
  }

  getSelectedValue(){
    if (this.question.ComponentId == 2 || this.question.ComponentId == 3 || this.question.ComponentId == 4){
      this.questionOption = new QuestionOptionsComponent(this.dynamicReferenceService, this.questionService);
    }
    else{
      this.questionOption = null;     
    }
  }

  getSelectedType(){
    if(this.question.TypeDonneeId == 1){
      this.hidden = false;
    }
    else{
      this.hidden = true;
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
