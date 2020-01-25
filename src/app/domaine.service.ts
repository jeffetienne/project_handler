import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from './model/constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  
  constructor(private db: AngularFireDatabase) { }

  getDomaines(){
    return this.db.list('/domaines').snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }

  getDomaine(id: string){
    return this.db.object('/domaines/' + id);
  }

  getDomaineFire(){
    return this.db.list('/domaines', ref => ref.orderByChild('name')).snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }
}
