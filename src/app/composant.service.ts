import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {
  private url = 'http://localhost:26922/api/component';

  constructor(private http: Http) { }

  getComponents(){
    return this.http.get(this.url);
  }

  getComponent(id: string){
    return this.http.get(this.url + '/' + id);
  }
}
