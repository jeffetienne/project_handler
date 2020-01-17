import { Constants } from './model/constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  //private url = 'http://192.168.0.165:26922/api/domaine';

  constructor(private http: Http) { }

  getDomaines(){
    let url = Constants.server + ':' + Constants.port + '/api/domaine'
    return this.http.get(url);
  }

  getDomaine(id: string){
    let urlDomaine = Constants.server + ':' + Constants.port + '/api/domaine/' + id;
    return this.http.get(urlDomaine);
  }
}
