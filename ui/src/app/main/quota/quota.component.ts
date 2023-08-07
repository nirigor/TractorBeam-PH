import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../../shared.service';
import { Quota } from 'src/app/modules/quota.module';

export interface QuotaData {
  id: string;
  path: string;
  used: number;
  hard: number;
}

@Component({
  selector: 'app-quota',
  templateUrl: './quota.component.html',
  styleUrls: ['./quota.component.css'],
})
export class QuotaComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['StorageId', 'QuotaPath', 'QuotaUsed', 'QuotaHard'];
  dataSource: MatTableDataSource<Quota> = new MatTableDataSource<Quota>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private svc: SharedService) {
  }

  refreshQuotas(StorageId: number = 0): void {
    if (StorageId) {
      this.svc.getAllStorageQuotas(StorageId).subscribe(
        (data) => { this.dataSource = new MatTableDataSource(data); });
    }
  }

  ngOnInit(): void {
    this.refreshQuotas(1);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { SharedService } from '../../shared.service';
// import { Quota } from 'src/app/modules/quota.module';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-quota',
//   templateUrl: './quota.component.html',
//   styleUrls: ['./quota.component.css']
// })
// export class QuotaComponent implements OnInit, AfterViewInit {
//   constructor (private svc: SharedService) {}

//   quotas: Quota[] | null = null;
//   displayedColumns: string[] = ['Storage', 'Path', 'Used', 'Hard', 'Edit'];
//   dataSource: MatTableDataSource<Quota>;

//   refreshQuotas(StorageId: number = 0): void {
//     if (StorageId) {
//       this.svc.getAllStorageQuotas(StorageId).subscribe(
//         (data) => { this.quotas = data; });
//     }
//   }

//   ngAfterViewInit(): void {
//     throw new Error('Method not implemented.');
//   }

//   ngOnInit(): void {
//     this.refreshQuotas(1);
//   }

 

// }
