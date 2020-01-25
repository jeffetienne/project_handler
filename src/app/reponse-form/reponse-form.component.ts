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
import { Component, OnInit } from '@angular/core';
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
export class ReponseFormComponent implements OnInit {

  reponsesForm: ReponseFormComponent[] = [];
  reponseForm: ReponseComponent;
  reponses: Reponse[] = [];
  questions: Question[] = [];
  id: string;
  idForm: string;
  formulaire: Formulaire = new Formulaire();
  reponse: Reponse = new Reponse();
  questions$;
  maxGroupe: MaxGroup = new MaxGroup();
  pipe: any;
  user: User = new User();
  myFormattedDate

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private questionService: QuestionService,
    private reponseService: ReponseService,
    private dynamicReferenceService: DynamicReferenceService,
    private auth: AngularFireAuth,
    private userService: UserService) {

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

  create() {
    if (this.reponses) {
      this.reponseService.getMaxGroupe()
        .valueChanges()
        .subscribe((maxgroup: MaxGroup) => {
          this.maxGroupe = maxgroup;
          let max: number = this.maxGroupe.valeur;
          //this.maxGroupe.valeur++;
          //this.reponseService.updateMaxGroup(this.maxGroupe);

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

                  r.Groupe = max;
                  r.CreeLe = this.myFormattedDate;
                  r.CreePar = user;

                  if(r.Question.ComponentId == 2 || r.Question.ComponentId == 3)
                  {
                    this.dynamicReferenceService.getDynamicReferencesByCode(r.Valeur)
                    .valueChanges()
                    .subscribe((references: DynamicReference[]) => {
                      r.Reference = references[0];
                      this.reponseService.create(r);
                    });
                  }else this.reponseService.create(r);

                  
                  //r.Reference = this.reponse.Reference;

                  

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
