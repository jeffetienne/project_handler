import { AngularFireDatabase } from 'angularfire2/database';
import { DynamicReference } from './model/dynamic-reference';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class DynamicReferenceService {
  
  constructor(private db: AngularFireDatabase) { }

  getDynamicReferences(){
    return this.db.list('/dynamicReferences').snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }

  getDynamicReference(id: string){
    return this.db.object('/dynamicReferences/' + id);
  }

  getDynamicReferencesByQuestion(idQuestion: string){
    return this.db.list('/dynamicReferences/', ref => ref.orderByChild('QuestionId').equalTo(idQuestion)).snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });;
  }

  getDynamicReferencesByCode(code: string){
    return this.db.list('/dynamicReferences/', ref => ref.orderByChild('Code').equalTo(code));
  }

  create(reference: DynamicReference){
    this.db.database.ref('/dynamicReferences').push(reference);
  }
}
