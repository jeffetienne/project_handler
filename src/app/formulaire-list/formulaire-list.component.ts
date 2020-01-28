import { SharedFormulaire } from './../model/shared-formulaire';
import { SharedFormulaireService } from './../shared-formulaire.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './../user.service';
import { User } from './../model/user';
import { Observable } from 'rxjs';
import { FormulaireService } from './../formulaire.service';
import { Formulaire } from './../model/formulaire';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-formulaire-list',
  templateUrl: './formulaire-list.component.html',
  styleUrls: ['./formulaire-list.component.css']
})
export class FormulaireListComponent implements OnInit {

  public items: Formulaire[] = [];
  //public tableResource: DataTableResource<Formulaire>;
  public itemCount: number;
  public formulaires$;
  public sharedFormulaires: SharedFormulaire[] = [];
  public id;
  public user$: Observable<firebase.User>;
  public user: User = new User();
  subscription;
  
  constructor(private formulaireService: FormulaireService, private route: ActivatedRoute, private userService: UserService, private afAuth: AngularFireAuth, private sharedFormulaireService: SharedFormulaireService) { 
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(u => {
      if(u)
      this.userService.get(u.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.formulaires$ = this.formulaireService.getFormulairesByUser(this.user.username).snapshotChanges().map(snapshots => {
          return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
        });
    
        /*
        if(this.formulaires$){
          this.subscription = this.formulaires$
          .subscribe((formulaires: Formulaire[]) => {
            this.items = formulaires;
            this.initializeTable(this.items);
          }, error => {
            alert('An unexpected error occured: ' + error);
            console.log(error);
          });
        }*/

        this.sharedFormulaireService.getSharedFormulairesByUser(this.user.username)
        .valueChanges()
        .subscribe((forms: SharedFormulaire[]) =>{
          this.sharedFormulaires = forms;
        });
      });
    });

    this.id = this.route.snapshot.paramMap.get('id');
    
  }

  /*
  initializeTable(formulaires){
    this.tableResource = new DataTableResource(formulaires);
      this.tableResource.query({ offset: 0 })
      .then(formulaires => this.items = formulaires);
      this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if (!this.tableResource) return;
    
    this.tableResource.query(params)
      .then(formulaires => this.items = formulaires);
    this.initializeTable(params);
  }*/

  delete(id: string){
    if (!confirm('Do you really want to delete this formulaire?')) return;

    if (id) this.formulaireService.deleteFormulaire(id);
  }

  ngOnInit() {
  }

}
