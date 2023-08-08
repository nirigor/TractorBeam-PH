import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { DirectoryQuotaInterface } from '../types/directory-quota.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuotasService } from './quotas.service';
import { Sort } from '@angular/material/sort';

@Injectable()

export class directoryQuotaDataSource extends DataSource<DirectoryQuotaInterface> {
    constructor(private QuotasService: QuotasService) {
        super();
    }

    directoryQuotas$ = new BehaviorSubject<DirectoryQuotaInterface[]>([]);
    isLoading$ = new BehaviorSubject<boolean>(false);

    connect(): Observable<DirectoryQuotaInterface[]> {
        return this.directoryQuotas$.asObservable();
    }

    disconnect(): void {
        this.directoryQuotas$.complete();
    }

    getDirectoryQuotas(StorageId: number, sort: Sort): void {
        this.isLoading$.next(true);
        let active: keyof DirectoryQuotaInterface = 'QuotaPath';
        switch(sort.active) {
            case 'StorageId':
                active = 'StorageId';
                break;
            case 'QuotaPath':
                active = 'QuotaPath';
                break;
            case 'QuotaUsed':
                active = 'QuotaUsed';
                break;
            case 'QuotaHard':
                active = 'QuotaHard';
                break;
            default:
                active = 'QuotaPath';
                break;
        }

        let data = this.QuotasService.SharedService.getKey('quotas');
        if ( data == ''){
            this.QuotasService.getDirectoryQuotas(StorageId).subscribe(data => {
                if (sort.direction == 'asc') { 
                    data.sort((a,b) => (a[active] > b[active]) ? 1 : -1) 
                } else {
                    data.sort((a,b) => (a[active] < b[active]) ? 1 : -1) 
                }
                this.directoryQuotas$.next(data);
                this.QuotasService.SharedService.setKey('quotas', data);
                this.isLoading$.next(false);
            })
        } else {
            if (sort.direction == 'asc') { 
                data.sort((a: DirectoryQuotaInterface, b: DirectoryQuotaInterface) => (a[active] > b[active]) ? 1 : -1)
            } else {
                data.sort((a: DirectoryQuotaInterface, b: DirectoryQuotaInterface) => (a[active] < b[active]) ? 1 : -1)
            }
            this.directoryQuotas$.next(data);
            this.isLoading$.next(false);
        }

    }
}