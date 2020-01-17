import { Formulaire } from './model/formulaire';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  url = Constants.server + ':' + Constants.port + '/api/formulaire';
  constructor(private http: Http) { }

  getFormulaires(){
    return this.http.get(this.url);
  }

  getFormulaire(id: string){
    return this.http.get(this.url + '/' + id);
  }

  createFormulaire(formulaire: Formulaire){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});

    return this.http.post(this.url, JSON.stringify(formulaire).toString(), requestOptions);
  }

  updateFormulaire(id: string, formulaire: Formulaire){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});

    return this.http.put(this.url + '/' + id, JSON.stringify(formulaire).toString(), requestOptions)
    .subscribe(response => {

    }, error => {
      alert(error);
    });
  }

  deleteFormulaire(id: string){

    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Delete, headers: headerOptions});

    return this.http.delete(this.url + '/' + id, requestOptions)
    .subscribe(response => {

    }, error => {
      alert(error);
    });
  }
}
