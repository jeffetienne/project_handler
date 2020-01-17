import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from './model/constants';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {
  private url = Constants.server + ':' + Constants.port + '/api/typedonnees';

  constructor(private http: Http) { }

  getDataTypes(){
    return this.http.get(this.url);
  }

  getDataType(id: string){
    return this.http.get(this.url + '/' + id);
  }
}
