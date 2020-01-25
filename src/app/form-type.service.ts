import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class FormTypeService {

  constructor(private db: AngularFireDatabase) { }

  getFormTypes(){
    return this.db.list('/formTypes');
  }

  getFormType(id: string){
    return this.db.object('/formTypes/' + id);
  }
}
