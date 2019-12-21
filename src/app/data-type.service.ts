import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {
  private url = 'http://localhost:26922/api/typedonnees';

  constructor(private http: Http) { }

  getDataTypes(){
    return this.http.get(this.url);
  }

  getDataType(id: string){
    return this.http.get(this.url + '/' + id);
  }
}
