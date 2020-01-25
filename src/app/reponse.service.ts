import { MaxGroup } from './model/max-group';
import { AngularFireDatabase } from 'angularfire2/database';
import { Reponse } from './model/reponse';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  constructor(private http: Http, private db: AngularFireDatabase) { }

  getReponses(){
    return this.db.list('/reponses');
  }

  getReponsesByQuestion(id: number){
    return this.db.list('/reponses', ref => ref.orderByChild('QuestionId').equalTo(id));
  }

  getReponsesByFormulaires(id: number){
    return this.db.list('/reponses', ref => ref.orderByChild('Question/FormulaireId').equalTo(id));
  }

  create(reponse: Reponse){
    return this.db.database.ref('/reponses').push(reponse);
    
  }

  getReponse(id: number){
    return this.db.object('/reponses' + id);
  }

  getMaxGroupe(){
    return this.db.object('/maxGroup/1');
  }

  updateMaxGroup(maxGroup: MaxGroup){
    this.db.object('/maxGroup/1').update(maxGroup);
  }

  update(id: string, reponse: Reponse){
    this.db.object('/reponses' + id).update(reponse);
  }

  delete(id: string){   
    this.db.object('/reponses/' + id).remove();
  }
}
