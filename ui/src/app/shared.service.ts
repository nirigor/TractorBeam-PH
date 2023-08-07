import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:8000/api';

  constructor(private http:HttpClient) { }

  getAllStorageQuotas(StorageId: number):Observable<any[]> {
    let params = new HttpParams().append("StorageId", StorageId);
    return this.http.get<any[]>(this.APIUrl + '/quotas/', { params : params});
  }

  getAllStorageArrays():Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/storage/');
  }
}
