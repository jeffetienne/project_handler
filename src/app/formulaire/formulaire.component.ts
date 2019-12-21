import { Project } from './../model/project';
import { Formulaire } from './../model/formulaire';
import { FormTypeService } from './../form-type.service';
import { FormulaireService } from './../formulaire.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { FormType } from '../model/form-type';

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
  id;
  formulaire: Formulaire = new Formulaire();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private projectService: ProjectService,
    private formTypeService: FormTypeService) { 
      
      this.formTypeService.getFormTypes()
      .subscribe(response => {
        this.formTypes = response.json();
      });

      this.projectService.getProjects()
      .subscribe(response => {
        this.projects = response.json();
      });

      this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.formulaireService
      .getFormulaire(this.id)
      .subscribe(response => {
        this.title = 'Modifier ce formulaire'
        this.textBouton = "Modifier"
        this.formulaire = response.json();
      });
    }

    save(formulaire: Formulaire) {
      formulaire.CreePar = 'Concepteur';
      formulaire.CreeLe = new Date();

      console.log(formulaire);
      
      if (this.id) {
        formulaire.Id = this.id;
        this.formulaireService.updateFormulaire(this.id, formulaire);
      }
      else this.formulaireService.createFormulaire(formulaire)
        .subscribe(response => {
  
        },
          error => {
            alert(error);
          });
  
      this.router.navigate(['/formulaires']);
    }

  ngOnInit() {
  }

}
