import { UserService } from './../user.service';
import { User } from './../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
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
  user$: Observable<firebase.User> = new Observable();
  userO: User = new User();

  constructor(private projectService: ProjectService, private formulaireService: FormulaireService, private afAuth: AngularFireAuth, private userservice: UserService, private auth: AuthService) { 
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(u => {
      if(u)
      this.userservice.get(u.uid).valueChanges().subscribe((user: User) => {
        this.userO = user;
      });
    });
    projectService.getProjects().subscribe(response => {
      this.projects = response.json();
    });

    formulaireService.getFormulaires().subscribe(response => {
      this.formulaires = response.json();
    });
  }

  logout(){
    this.auth.userSignOut();
  }

  ngOnInit() {
  }

}
