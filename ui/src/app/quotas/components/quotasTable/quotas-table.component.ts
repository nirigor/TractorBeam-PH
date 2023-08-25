import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { directoryQuotaDataSource } from "../../services/directory-quotas.dataSource";
import { QuotasService } from "../../services/quotas.service";
import { Sort } from "@angular/material/sort";
import { PaginatorIntl } from "../../services/paginatorIntl.service";
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
    selector: 'quotas-table',
    templateUrl: './quotas-table.component.html',
    styleUrls: ['./quotas-table.component.css'],
    providers: [{ provide : MatPaginatorIntl, useClass: PaginatorIntl }],
})

export class quotasTableComponent implements OnInit{
    readonly StorageId = 1;
    currentPage = 0;
    PageSize = 10;
    filterValue = '';
    sortValue: Sort = {'active' : 'QuotaPath', 'direction' : 'asc'};

    constructor(private QuotasService: QuotasService) {}

    displayedColumns: string[] = ['StorageId', 'QuotaPath', 'QuotaUsed', 'QuotaHard'];
    
    
    dataSource = new directoryQuotaDataSource(this.QuotasService);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {        
        this.dataSource.getDirectoryQuotas(this.StorageId, this.sortValue, this.filterValue, this.currentPage, this.PageSize);
    }

    sortDirectoryQuotas(sort: Sort): void {
        this.sortValue = sort;
        this.dataSource.getDirectoryQuotas(this.StorageId, this.sortValue, this.filterValue, this.currentPage, this.PageSize);
    }

    applyFilter(event: Event) {
        this.filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.getDirectoryQuotas(this.StorageId, this.sortValue, this.filterValue, this.currentPage, this.PageSize);
    }

    handlePageEvent(pageEvent: PageEvent) {
        this.currentPage = pageEvent.pageIndex;
        this.PageSize = pageEvent.pageSize;
        this.dataSource.getDirectoryQuotas(this.StorageId, this.sortValue, this.filterValue, this.currentPage, this.PageSize);
    }
}