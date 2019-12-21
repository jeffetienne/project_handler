import { FormulaireService } from './../formulaire.service';
import { Formulaire } from './../model/formulaire';
import { ProjectService } from './../project.service';
import { Project } from './../model/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  projects: Project[] = [];
  formulaires: Formulaire[] = [];

  constructor(private projectService: ProjectService, private formulaireService: FormulaireService) { 
    projectService.getProjects().subscribe(response => {
      this.projects = response.json();
    });

    formulaireService.getFormulaires().subscribe(response => {
      this.formulaires = response.json();
    });
  }

  ngOnInit() {
  }

}
