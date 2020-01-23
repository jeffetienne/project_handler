import { AngularFireDatabase } from 'angularfire2/database';
import { Constants } from './model/constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  //private url = 'http://192.168.0.165:26922/api/domaine';

  constructor(private http: Http, private db: AngularFireDatabase) { }

  getDomaines(){
    let url = Constants.server + ':' + Constants.port + '/api/domaine'
    return this.http.get(url);
  }

  getDomaine(id: string){
    let urlDomaine = Constants.server + ':' + Constants.port + '/api/domaine/' + id;
    return this.http.get(urlDomaine);
  }

  getDomaineFire(){
    return this.db.list('/domaines', ref => ref.orderByChild('name')).snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...(c.payload.val()) as {} }));
    });
  }
}
