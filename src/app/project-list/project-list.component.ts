import { Project } from './../model/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { Observable, timer, Subscription } from 'rxjs';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';

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
  subscription;
  timerSubscription: Subscription;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private changeDetectorRef: ChangeDetectorRef) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.projects$ = this.projectService.getProjects();
    this.subscription = this.projectService.getProjects()
    .subscribe(response => {
      this.projects = response.json();
      
      this.initializeTable(this.projects);
      this.subscribeToData();
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

  private subscribeToData(): void {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.reloadProjects);
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

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }
}
