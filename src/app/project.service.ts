import { Project } from './model/project';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';
import { Headers } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = Constants.server + ':' + Constants.port + '/api/projet/';

  constructor(private http: Http) { }

  getProjects(){
    return this.http.get(this.url);
  }

  createProject(project: Project){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Post, headers: headerOptions});

    return this.http.post(this.url, JSON.stringify(project).toString(), requestOptions);
  }

  getProject(id: string){
    return this.http.get(this.url + '/' + id);
  }

  updateProject(id: string, project: Project){
    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headerOptions});

    return this.http.put(this.url + '/' + id, JSON.stringify(project).toString(), requestOptions)
    .subscribe(response => {

    }, error => {
      alert(error);
    });
  }

  delete(id: string){
    
    let urlDelete = 'http://localhost:26922/api/projet/' + id;

    let headerOptions: Headers 
    headerOptions = new Headers({ 'Content-type': 'application/json' });
    let requestOptions: RequestOptions 
    requestOptions = new RequestOptions({method: RequestMethod.Delete, headers: headerOptions});

    return this.http.delete(urlDelete, requestOptions)
    .subscribe(response => {

    }, error => {
      alert(error);
    });
  }
}
