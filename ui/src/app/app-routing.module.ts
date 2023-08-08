import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { quotasTableComponent } from './quotas/components/quotasTable/quotas-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'quotas', pathMatch: 'full' },
  { path: 'quotas', component: quotasTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
