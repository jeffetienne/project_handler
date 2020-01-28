import { Subscription } from 'rxjs';
import { DynamicReferenceService } from './../dynamic-reference.service';
import { User } from './../model/user';
import { UserService } from './../user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { MaxGroup } from './../model/max-group';
import { ReponseForm } from './../model/reponse-form';
import { FormulaireService } from './../formulaire.service';
import { Formulaire } from './../model/formulaire';
import { Question } from './../model/question';
import { ReponseService } from './../reponse.service';
import { ReponseComponent } from './../reponse/reponse.component';
import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { Reponse } from '../model/reponse';
import { Router, ActivatedRoute } from '@angular/router';
import { ComposantService } from '../composant.service';
import { DataTypeService } from '../data-type.service';
import { QuestionService } from '../question.service';
import { DatePipe } from '@angular/common';
import { DynamicReference } from '../model/dynamic-reference';

@Component({
  selector: 'reponse-form',
  templateUrl: './reponse-form.component.html',
  styleUrls: ['./reponse-form.component.css']
})
export class ReponseFormComponent implements OnInit, OnDestroy {

  @Input("value") keyMax: string;

  reponsesForm: ReponseFormComponent[] = [];
  reponseForm: ReponseComponent;
  reponses: Reponse[] = [];
  maxReponses: Reponse[] = [];
  questions: Question[] = [];
  id: string;
  idForm: string;
  formulaire: Formulaire = new Formulaire();
  reponse: Reponse = new Reponse();
  questions$;
  maxGroupe: MaxGroup = new MaxGroup();
  maxGroup$
  pipe: any;
  user: User = new User();
  myFormattedDate
  idMax: string;
  max: number = 0;
  Subscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private questionService: QuestionService,
    private reponseService: ReponseService,
    private dynamicReferenceService: DynamicReferenceService,
    private auth: AngularFireAuth,
    private userService: UserService) {


  }

  ngOnInit() {
    this.idForm = this.route.snapshot.paramMap.get('id');

    if (this.idForm) {
      this.formulaireService.getFormulaire(this.idForm)
        .valueChanges()
        .subscribe((formulaire: Formulaire) => {
          this.formulaire = formulaire;
        });
      this.questions$ = this.questionService.getQuestionsByForm(this.idForm).valueChanges();
      this.questions$.subscribe((questions: Question[]) => {
        this.questions = questions;

        this.maxGroup$ = this.reponseService.getMaxGroupe();
        this.questions.forEach(q => {
          let r = new Reponse()
          r.QuestionId = q.Id.toString();
          r.Question = q;
          //r.Groupe = rep[0].valeur;
          this.reponses.push(r);
        });
      });
    }
  }

  ngOnDestroy() {
    //this.Subscription.unsubscribe();
  }

  create() {



    //alert(this.keyMax);
    if (this.reponses) {
      let maxkey: HTMLInputElement = <HTMLInputElement>document.getElementById('keyMax');
      let maxValue: HTMLInputElement = <HTMLInputElement>document.getElementById('valMax');

      let valMax: number;
      valMax = +maxValue.value;
      valMax++;

      this.maxGroupe.valeur = valMax;

      this.reponseService.createMax(this.maxGroupe);
      this.reponseService.deleteMax(maxkey.value);
      
      this.auth.user.subscribe(u => {
        this.userService.get(u.uid)
          .valueChanges()
          .subscribe((user: User) => {
            this.user = user;

            let now = Date.now();
            this.pipe = new DatePipe('en-US');
            this.myFormattedDate = this.pipe.transform(now, 'short');

            this.reponses.forEach(r => {
              //r.Question = null;

              r.CreeLe = this.myFormattedDate;
              r.CreePar = user;

              r.Groupe = +maxValue.value;
              if (r.Question.ComponentId == 2 || r.Question.ComponentId == 3) {
                this.dynamicReferenceService.getDynamicReferencesByCode(r.Valeur)
                  .valueChanges()
                  .subscribe((references: DynamicReference[]) => {
                    r.Reference = references[0];
                    this.reponseService.create(r).then(result => {
                      this.router.navigateByUrl('/formulaire-entries/' + this.idForm);
                    });
                  });
              } else this.reponseService.create(r).then(result => {
                this.router.navigateByUrl('/formulaire-entries/' + this.idForm);
              });
            });
          });
      });
    }
  }

  valueChange(questionId) {
    this.reponses.forEach(r => {
      if (r.QuestionId == questionId) {
        r.CreeLe = this.myFormattedDate;
        r.CreePar = this.user;
      }
    });
  }

}
