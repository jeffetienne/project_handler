import { DynamicReference } from './model/dynamic-reference';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicReferenceService {
  urlByQuestion = 'http://localhost:26922/api/dynamicreferencebyquestion';
  url = 'http://localhost:26922/api/dynamicreference';

  constructor(private http: Http) { }

  getDynamicReferences(){
    return this.http.get(this.url);
  }

  getDynamicReference(id: string){
    return this.http.get(this.url + '/' + id);
  }

  getDynamicReferencesByQuestion(idQuestion: number){
    return this.http.get(this.urlByQuestion + '/' + idQuestion);
  }

  getDynamicReferencesByCode(idQuestion: number, code: string){
    return this.http.get(this.urlByQuestion + '/' + idQuestion + '/' + code);
  }

  create(reference: DynamicReference){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});

    return this.http.post(this.url, JSON.stringify(reference).toString(), requestOptions);
  }
}
