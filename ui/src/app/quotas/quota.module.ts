import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { quotasTableComponent } from "./components/quotasTable/quotas-table.component";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuotasService } from "./services/quotas.service";
import { directoryQuotaDataSource } from "./services/directory-quotas.dataSource";


@NgModule({
    imports: [CommonModule, MatTableModule, MatSortModule, MatProgressSpinnerModule],
    declarations: [quotasTableComponent],
    exports: [quotasTableComponent],
    providers: [QuotasService, directoryQuotaDataSource]
})

export class QuotaModule {

}