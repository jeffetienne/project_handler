import { User } from './../model/user';
import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { Project } from './../model/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public items: Project[] = [];
  //public tableResource: DataTableResource<Project>;
  public itemCount: number;
  public projects$;
  public id;
  subscription;
 
  constructor(private projectService: ProjectService, 
    private route: ActivatedRoute, 
    private userService: UserService,
    private auth: AuthService) { 

    this.auth.user$
      .subscribe(user => {
        if(user)
        this.userService.get(user.uid)
          .valueChanges()
          .subscribe((user0: User) => {
            this.projects$ = this.projectService.getProjects().snapshotChanges().map(snapshots => {
              return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
            });

            /*
            this.subscription = this.projects$
              .subscribe(projects => {
                this.items = projects;

                this.initializeTable(projects);
              });*/
          });
      });
      this.id = this.route.snapshot.paramMap.get('id');
      
    
      
  }
/*
  initializeTable(projects){
    this.tableResource = new DataTableResource(projects);
      this.tableResource.query({ offset: 0 })
      .then(projects => this.items = projects);
      this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if (!this.tableResource) return;
    
    this.tableResource.query(params)
      .then(projects => this.items = projects);
    this.initializeTable(params);
  }

  filter(query: string){
    let filteredProjects = (query) ? 
    this.items.filter(p => p.Name.toLowerCase().includes(query.toLowerCase())) :
    this.items;

    this.reloadItems(filteredProjects);
  }*/

  delete(id: string){
    if (!confirm('Do you really want to delete this project?')) return;

    if (id) this.projectService.delete(id);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    //this.subscription.unsubscribe();
  }
}
