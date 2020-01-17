import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {
  private url = Constants.server + ':' + Constants.port + '/api/component';

  constructor(private http: Http) { }

  getComponents(){
    return this.http.get(this.url);
  }

  getComponent(id: string){
    return this.http.get(this.url + '/' + id);
  }
}
