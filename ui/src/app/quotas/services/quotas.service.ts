import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DirectoryQuotaInterface } from '../types/directory-quota.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';
@Injectable()

export class QuotasService {
    readonly APIUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient, public SharedService: SharedService) {}

    getDirectoryQuotas(StorageId: number):Observable<DirectoryQuotaInterface[]> {
        let params = new HttpParams().append("StorageId", StorageId);
        return this.http.get<DirectoryQuotaInterface[]>(this.APIUrl + '/quotas/', { params : params });
    }
}