import { Domaine } from './../model/domaine';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Project } from './../model/project';
import { ProjectService } from './../project.service';
import { DomaineService } from './../domaine.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  domaines: Domaine[]=[];
  project: Project= new Project();
  id;
  domaine: Domaine;
  title = "Ajouter un nouveau projet";
  textBouton = "Ajouter"
  constructor(private router: Router,
    private route: ActivatedRoute,
    private domaineService: DomaineService,
    private projectService: ProjectService) {
    this.domaineService.getDomaines()
      .subscribe(response => {
        this.domaines = response.json();
      });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.projectService
      .getProject(this.id)
      .subscribe(response => {
        this.title = 'Modifier ce projet'
        this.textBouton = "Modifier"
        this.project = response.json();
      });
  }
  
  save(project: Project) {

    project.CreePar = 'Concepteur';
    project.CreeLe = new Date();

    if (this.id){
      project.Id = this.id;
      this.projectService.updateProject(this.id, project);
    } 
    else this.projectService.createProject(project)
      .subscribe(response => {

      },
        error => {
          alert(error);
        });

    this.router.navigate(['']);
  }

  ngOnInit() {
  }

}
