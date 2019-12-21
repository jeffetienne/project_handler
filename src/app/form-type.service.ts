import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  url = 'http://localhost:26922/api/formtype';
  constructor(private http: Http) { }

  getFormTypes(){
    return this.http.get(this.url);
  }
}
