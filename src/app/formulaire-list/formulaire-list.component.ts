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
  
  constructor(private formulaireService: FormulaireService, private route: ActivatedRoute) { 
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
