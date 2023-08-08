import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly DEFAULT_LOCATION = 'SESSION';
  readonly APIUrl = 'http://localhost:8000/api';

  constructor(private http:HttpClient) { }

  getAllStorageArrays():Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/storage/');
  }

  setKey(key: string, value: any, location: string = this.DEFAULT_LOCATION) {
    if (location == 'SESSION') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else if (location == 'LOCAL') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('Incorrect location was provided!');
    }
  }

  getKey(key: string, location: string = this.DEFAULT_LOCATION) : any {
    if (location == 'SESSION') {
      let v = sessionStorage.getItem(key);
      if (v) { return JSON.parse(v); }
    } 
    if (location == 'LOCAL') {
      let v = localStorage.getItem(key);
      if (v) { return JSON.parse(v); }
    } 
    return ""
  }
}
