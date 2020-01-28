import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { Project } from './../model/project';
import { Formulaire } from './../model/formulaire';
import { FormTypeService } from './../form-type.service';
import { FormulaireService } from './../formulaire.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { FormType } from '../model/form-type';
import { DatePipe } from '@angular/common';
import { User } from '../model/user';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  title = "Ajouter un nouveau formulaire";
  textBouton = "Ajouter";
  formTypes: FormType[] = [];
  projects: Project[] = [];
  formTypes$;
  projets$;
  id;
  formulaire: Formulaire = new Formulaire();
  pipe: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private projectService: ProjectService,
    private formTypeService: FormTypeService,
    private auth: AuthService,
    private userService: UserService) {

    this.formTypeService.getFormTypes()
      .valueChanges()
      .subscribe((types: FormType[]) => {
        this.formTypes = types;
      });

    this.projets$ = this.projectService.getProjects().snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.formulaireService
      .getFormulaire(this.id)
      .valueChanges()
      .subscribe((formulaire: Formulaire) => {
        this.title = 'Modify this form'
        this.textBouton = "Modify"
        this.formulaire = formulaire;
      });
  }

  save(formulaire: Formulaire) {
    let now = Date.now();
    this.pipe = new DatePipe('en-US');
    let myFormattedDate = this.pipe.transform(now, 'short');
    formulaire.CreeLe = myFormattedDate;

    this.auth.user$
      .subscribe(user => {
        if (user)
          this.userService
            .get(user.uid)
            .valueChanges()
            .subscribe((user0: User) => {
              formulaire.CreePar = user0;
              formulaire.username = user0.username;
              let now = Date.now();
              this.pipe = new DatePipe('en-US');
              let myFormattedDate = this.pipe.transform(now, 'short');
              formulaire.CreeLe = myFormattedDate;

              let projet: Project;
              this.projectService.getProject(formulaire.ProjectId.toString())
                .valueChanges()
                .subscribe((p: Project) => {
                  projet = p;
                  formulaire.Projet = projet;

                  let formType: FormType;
                  this.formTypeService.getFormType(formulaire.FormTypeId.toString())
                    .valueChanges()
                    .subscribe((t: FormType) => {
                      formType = t;

                      formulaire.FormType = formType;
                      if (this.id) {
                        formulaire.Id = this.id;
                        this.formulaireService.updateFormulaire(this.id, formulaire);
                      }
                      else this.formulaireService.createFormulaire(formulaire);
                    });
                });

            });
      });






    this.router.navigate(['/formulaires']);
  }

  ngOnInit() {
  }

}
