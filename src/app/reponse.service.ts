import { Reponse } from './model/reponse';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  url = 'http://localhost:26922/api/reponse';
  urlQuest = 'http://localhost:26922/api/reponseByQuestion';
  urlForm = 'http://localhost:26922/api/reponsesbyformulaire';
  constructor(private http: Http) { }

  getReponses(){
    return this.http.get(this.url);
  }

  getReponsesByQuestion(id: number){
    return this.http.get(this.urlQuest + '/' + id);
  }

  getReponsesByFormulaires(id: number){
    return this.http.get(this.urlForm + '/' + id);
  }

  create(reponse: Reponse){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});

    return this.http.post(this.url, JSON.stringify(reponse).toString(), requestOptions);
    
  }

  getReponse(id: number){
    return this.http.get(this.url + '/' + id);
  }

  update(id: string, reponse: Reponse){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});

    return this.http.put(this.url + '/' + id, JSON.stringify(reponse).toString(), requestOptions)
    .subscribe(response => {
      alert('Reponse updated successfully!')
    }, error => {
      alert(error);
    });
  }

  delete(id: string){   
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Delete, headers: headerOptions});

    return this.http.delete(this.url + '/' + id, requestOptions)
    .subscribe(response => {
      alert('Reponse deleted successfully!');
    }, error => {
      alert(error);
    });
  }
}
