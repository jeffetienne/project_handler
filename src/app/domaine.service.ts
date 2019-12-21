import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private url = 'http://localhost:26922/api/domaine';

  constructor(private http: Http) { }

  getDomaines(){
    return this.http.get(this.url);
  }

  getDomaine(id: string){
    let urlDomaine = 'http://localhost:26922/api/domaine/' + id;
    return this.http.get(urlDomaine);
  }
}
