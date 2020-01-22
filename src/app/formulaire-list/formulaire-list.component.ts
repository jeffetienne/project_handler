import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './../user.service';
import { User } from './../model/user';
import { Observable } from 'rxjs';
import { FormulaireService } from './../formulaire.service';
import { Formulaire } from './../model/formulaire';
import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulaire-list',
  templateUrl: './formulaire-list.component.html',
  styleUrls: ['./formulaire-list.component.css']
})
export class FormulaireListComponent implements OnInit {

  formulaires: Formulaire[] = [];
  tableResource: DataTableResource<Formulaire>;
  FormulaireCount: number;
  formulaires$;
  id;
  user$: Observable<firebase.User>;
  user: User = new User();
  
  constructor(private formulaireService: FormulaireService, private route: ActivatedRoute, private userService: UserService, private afAuth: AngularFireAuth) { 
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(u => {
      if(u)
      this.userService.get(u.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
      });
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.formulaireService.getFormulaires()
    .subscribe(response => {
      this.formulaires = response.json();
      this.initializeTable(this.formulaires);
    }, error => {
      alert('An unexpected error occured: ' + error);
      console.log(error);
    });
  }

  initializeTable(formulaires){
    this.tableResource = new DataTableResource(formulaires);
      this.tableResource.query({ offset: 0 })
      .then(formulaires => this.formulaires = formulaires);
      this.tableResource.count()
      .then(count => this.FormulaireCount = count);
  }

  reloadFormulaires(params){
    if (!this.tableResource) return;
    
    this.tableResource.query(params)
      .then(formulaires => this.formulaires = formulaires);
    this.initializeTable(params);
  }

  delete(id: string){
    if (!confirm('Do you really want to delete this formulaire?')) return;

    if (id) this.formulaireService.deleteFormulaire(id);
  }

  ngOnInit() {
  }

}
