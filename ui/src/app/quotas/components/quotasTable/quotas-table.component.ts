import { Component, OnInit } from "@angular/core";
import { directoryQuotaDataSource } from "../../services/directory-quotas.dataSource";
import { QuotasService } from "../../services/quotas.service";
import { Sort } from "@angular/material/sort";

@Component({
    selector: 'quotas-table',
    templateUrl: './quotas-table.component.html',
    styleUrls: ['./quotas-table.component.css']
})

export class quotasTableComponent implements OnInit{
    constructor(private QuotasService: QuotasService) {}

    displayedColumns: string[] = ['StorageId', 'QuotaPath', 'QuotaUsed', 'QuotaHard'];
    defaultSort: Sort = {'active' : 'QuotaPath', 'direction' : 'asc'};
    
    dataSource = new directoryQuotaDataSource(this.QuotasService);

    ngOnInit(): void {        
        this.dataSource.getDirectoryQuotas(1, this.defaultSort);
    }

    sortDirectoryQuotas(sort: Sort): void {
        this.dataSource.getDirectoryQuotas(1, sort);
    }
}