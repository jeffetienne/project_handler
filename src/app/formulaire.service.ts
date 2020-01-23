import { AngularFireDatabase } from 'angularfire2/database';
import { Formulaire } from './model/formulaire';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  url = Constants.server + ':' + Constants.port + '/api/formulaire';
  constructor(private http: Http, private db: AngularFireDatabase) { }

  getFormulaires(){
    return this.db.list('/formulaires');
    //return this.http.get(this.url);
  }

  getFormulaire(id: string){
    return this.db.object('/formulaires/' + id);
  }

  getFormulairesByUser(username: string){
    return this.db.list('/formulaires', ref => ref.orderByChild('CreePar').equalTo(username));
  }

  createFormulaire(formulaire: Formulaire){
    this.db.database.ref('/formulaires').push(formulaire);
  }

  updateFormulaire(id: string, formulaire: Formulaire){
    this.db.object('/formulaires/' + id).update(formulaire)
  }

  deleteFormulaire(id: string){
    return this.db.object('/formulaires/' + id).remove();
  }
}
