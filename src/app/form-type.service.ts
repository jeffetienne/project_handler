import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  url = Constants.server + ':' + Constants.port + '/api/formtype';
  constructor(private http: Http) { }

  getFormTypes(){
    return this.http.get(this.url);
  }
}
