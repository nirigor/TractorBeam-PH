import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { quotasTableComponent } from './quotas/components/quotas-table.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],  
})
export class MainComponent implements OnInit {
  constructor(private svc: SharedService) {}
  currentScreen: string = "dashboard";

  @ViewChild(quotasTableComponent)
  child!: quotasTableComponent;

  ngOnInit(): void {
    
  }
  changeScreen(newScreen: string) {
    this.currentScreen = newScreen;
  }

  applyFilter(event: Event){
    this.child.applyFilter(event);
    this.child.filterValue = (event.target as HTMLInputElement).value;
  }

  clearCache(){
    this.svc.clearAll();
    window.location.reload();
  }
}
