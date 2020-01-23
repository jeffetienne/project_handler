import { AngularFireDatabase } from 'angularfire2/database';
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

  constructor(private http: Http, private db: AngularFireDatabase) { }

  getProjects(){
    return this.db.list('/projets');
    //return this.http.get(this.url);
  }

  createProject(project: Project){

    this.db.database.ref('/projets').push(project);
  }

  getProject(id: string){
    return this.db.object('/projets/' + id);
    //return this.http.get(this.url + '/' + id);
  }

  getProjetByUser(username: string){
    return this.db.list('/projets', ref => ref.orderByChild('CreePar').equalTo(username));
  }

  updateProject(id: string, project: Project){
    
    this.db.object('/projets/' + id).update(project)
  }

  delete(id: string){
    
    return this.db.object('/projets/' + id).remove();
  }
}
