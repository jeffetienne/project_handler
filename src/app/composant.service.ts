import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {
  
  constructor(private db: AngularFireDatabase) { }

  getComponents(){
    return this.db.list('/components').snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }

  getComponent(id: string){
    return this.db.object('/components/' + id);
  }
}
