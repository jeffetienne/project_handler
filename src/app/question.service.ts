import { AngularFireDatabase } from 'angularfire2/database';
import { Question } from './model/question';
import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private db: AngularFireDatabase) { }

  getQuestions(){
    return this.db.list('/questions');
  }

  getQuestionsByForm(idForm: string){
    return this.db.list('/questions', ref => ref.orderByChild('FormulaireId').equalTo(idForm));
  }

  createQuestion(question: Question){
    return this.db.database.ref('/questions').push(question);
    
  }

  getQuestion(id: string){
    return this.db.object('/questions/' + id);
  }

  updateQuestion(id: string, question: Question){
    this.db.object('/questions/' + id).update(question)
  }

  delete(id: string){
    
    return this.db.object('/questions/' + id).remove();
  }
}
