import { Question } from './model/question';
import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url = Constants.server + ':' + Constants.port + '/api/question';
  urlForm = Constants.server + ':' + Constants.port + '/api/questionsbyformulaire';
  constructor(private http: Http) { }

  getQuestions(){
    return this.http.get(this.url);
  }

  getQuestionsByForm(idForm: string){
    return this.http.get(this.urlForm + '/' + idForm);
  }

  createQuestion(question: Question){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});

    return this.http.post(this.url, JSON.stringify(question).toString(), requestOptions);
    
  }

  getQuestion(id: string){
    return this.http.get(this.url + '/' + id);
  }

  updateQuestion(id: string, question: Question){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});

    return this.http.put(this.url + '/' + id, JSON.stringify(question).toString(), requestOptions)
    .subscribe(response => {
      alert('Question updated successfully!')
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
      alert('Question deleted successfully!');
    }, error => {
      alert(error);
    });
  }
}
