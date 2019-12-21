import { Project } from './../model/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  tableResource: DataTableResource<Project>;
  projectCount: number;
  projects$;
  id;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.projects$ = this.projectService.getProjects();
    this.projectService.getProjects()
    .subscribe(response => {
      this.projects = response.json();
      
      this.initializeTable(this.projects);
    }, error => {
      alert('An unexpected error occured.' + error);
    });

  }

  initializeTable(projects){
    this.tableResource = new DataTableResource(projects);
      this.tableResource.query({ offset: 0 })
      .then(projects => this.projects = projects);
      this.tableResource.count()
      .then(count => this.projectCount = count);
  }

  reloadProjects(params){
    if (!this.tableResource) return;
    
    this.tableResource.query(params)
      .then(projects => this.projects = projects);
    this.initializeTable(params);
  }

  delete(id: string){
    if (!confirm('Do you really want to delete this project?')) return;

    if (id) this.projectService.delete(id);
  }

  ngOnInit() {
  }

}
