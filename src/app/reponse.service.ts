import { MaxGroup } from './model/max-group';
import { AngularFireDatabase } from 'angularfire2/database';
import { Reponse } from './model/reponse';
import { Injectable, Directive } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Constants } from './model/constants';
import { Directionality } from '@angular/cdk/bidi';

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

  getLastReponse(){
    return this.db.list('/reponses', ref => ref.limitToLast(1));
  }
  getReponse(id: number){
    return this.db.object('/reponses/' + id);
  }

  getMaxGroupe(){
    return this.db.list('/maxGroup').snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }

  createMax(max: MaxGroup){
    return this.db.database.ref('/maxGroup').push(max);  
  }

  updateMaxGroup(maxGroup: MaxGroup){
    this.db.object('/maxGroup/1').set(maxGroup.valeur);
  }

  deleteMax(id: string){   
    this.db.object('/maxGroup/' + id).remove();
  }

  update(id: string, reponse: Reponse){
    this.db.object('/reponses' + id).update(reponse);
  }

  delete(id: string){   
    this.db.object('/reponses/' + id).remove();
  }
}
