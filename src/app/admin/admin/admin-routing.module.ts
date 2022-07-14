import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffdeskComponent } from '../staffdesk/staffdesk.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'staff-dashboard', component: DashboardComponent },
  { path: 'staff-desk', component: StaffdeskComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
