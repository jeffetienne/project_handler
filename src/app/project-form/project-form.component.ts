import { AuthService } from './../auth.service';
import { UserService } from './../user.service';
import { Domaine } from './../model/domaine';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Project } from './../model/project';
import { ProjectService } from './../project.service';
import { DomaineService } from './../domaine.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  domaines: Domaine[] = [];
  project: Project = new Project();
  id;
  domaine: Domaine;
  title = "Ajouter un nouveau projet";
  textBouton = "Ajouter";
  domaines$;
  user$: Observable<firebase.User> = new Observable();
  userO: User = new User();
  pipe: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private domaineService: DomaineService,
    private projectService: ProjectService,
    private userService: UserService,
    private auth: AuthService) {
    /*
  this.domaineService.getDomaines()
    .subscribe(response => {
      this.domaines = response.json();
    });//*/

    this.domaines$ = this.domaineService.getDomaineFire();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.projectService
      .getProject(this.id)
      .valueChanges().take(1)
      .subscribe((p: Project) => {
        this.project = p;
        this.textBouton = "Modifier";
        this.title = "Modification du projet";
      });
  }

  save(project: Project) {

    this.auth.user$
      .subscribe(user => {
        if (user)
          this.userService
            .get(user.uid)
            .valueChanges()
            .subscribe((user0: User) => {

              project.CreePar = user0;
              project.username = user0.username;
              let now = Date.now();
              this.pipe = new DatePipe('en-US');
              let myFormattedDate = this.pipe.transform(now, 'short');
              project.CreeLe = myFormattedDate;

              this.domaineService.getDomaine(project.DomaineId.toString())
                .valueChanges()
                .subscribe((dom: Domaine) => {
                  project.Domaine = dom;
                  if (this.id) this.projectService.updateProject(this.id, project);
                  else this.projectService.createProject(project);
                });



              this.router.navigate(['projet']);
            });
      });
  }

  ngOnInit() {
  }

}
