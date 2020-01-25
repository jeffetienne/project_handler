import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {
  
  constructor(private db: AngularFireDatabase) { }

  getDataTypes(){
    return this.db.list('/typeDonnees').snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }

  getDataType(id: string){
    return this.db.object('/typeDonnees/' + id);
  }
}
