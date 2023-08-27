import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { quotasTableComponent } from "./components/quotas-table.component";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuotasService } from "./services/quotas.service";
import { directoryQuotaDataSource } from "./services/directory-quotas.dataSource";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';


import { SIPipe } from '../pipes/si.pipe';

@NgModule({
    imports: [  CommonModule, 
                MatTableModule, 
                MatSortModule, 
                MatProgressSpinnerModule, 
                MatPaginatorModule,
                MatInputModule,
                MatFormFieldModule,
                MatIconModule,
                MatButtonModule,
                MatToolbarModule,
                MatTabsModule,
            ],
    declarations: [quotasTableComponent, SIPipe],
    exports: [quotasTableComponent],
    providers: [QuotasService, directoryQuotaDataSource]
})

export class QuotaModule {

}