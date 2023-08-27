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
    length = 0;
    connect(): Observable<DirectoryQuotaInterface[]> {
        return this.directoryQuotas$.asObservable();
    }

    disconnect(): void {
        this.directoryQuotas$.complete();
        this.isLoading$.complete();
    }

    getDirectoryQuotas(StorageId: number, sort: Sort, filter: string, pageIndex: number, pageSize: number): void { 
        this.isLoading$.next(true);
        let quotas = this.QuotasService.SharedService.getKey('quotas');
        if (!quotas) {
            this.QuotasService.getDirectoryQuotas(StorageId).subscribe(data => { 
                this.QuotasService.SharedService.setKey('quotas', data);
                data = this.filter(data, filter);
                data = this.sortDirectoryQuotas(data, sort);
                this.length = data.length;
                data = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
                this.directoryQuotas$.next(data);
                this.isLoading$.next(false);
            });
        } else {
            let data = this.filter(quotas, filter);
            data = this.sortDirectoryQuotas(data, sort);
            this.length = data.length;
            data = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
            this.directoryQuotas$.next(data);
            this.isLoading$.next(false);
        }
    }

    filter(quotas: DirectoryQuotaInterface[], filterValue: string): DirectoryQuotaInterface[] {
        if (!filterValue) return quotas;
        return quotas.filter(e =>
            e.StorageId.toString().toLowerCase().includes(filterValue.trim().toLowerCase()) ||
            e.QuotaPath.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
            e.QuotaUsed.toString().toLowerCase().includes(filterValue.trim().toLowerCase()) ||
            e.QuotaHard.toString().toLowerCase().includes(filterValue.trim().toLowerCase())
        );
    }

    sortDirectoryQuotas(quotas: DirectoryQuotaInterface[], sort: Sort) : DirectoryQuotaInterface[]{
        let sorted: DirectoryQuotaInterface[] = [];
        if (sort.active && sort.direction != '') {
            sorted = quotas.sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                switch (sort.active) {
                  case 'StorageId':
                    return this.compare(a.StorageId, b.StorageId, isAsc);
                  case 'QuotaPath':
                    return this.compare(a.QuotaPath, b.QuotaPath, isAsc);
                  case 'QuotaUsed':
                    return this.compare(a.QuotaUsed, b.QuotaUsed, isAsc);
                  case 'QuotaHard':
                    return this.compare(a.QuotaHard, b.QuotaHard, isAsc);
                  default:
                    return this.compare(a.QuotaPath, b.QuotaPath, isAsc);
                }
            });
        }
        return sorted;
    }
    
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}