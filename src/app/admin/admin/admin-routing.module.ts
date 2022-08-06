import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffdeskComponent } from '../staffdesk/staffdesk.component';
import { ViewApplicationComponent } from '../view-application/view-application.component';
import { ApplicationComponent } from '../application/application.component';
import { AllStaffComponent } from '../all-staff/all-staff.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'staff-dashboard', component: DashboardComponent },
  { path: 'staff-desk', component: StaffdeskComponent },
  { path: 'view-application', component: ViewApplicationComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'all-staff', component: AllStaffComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
