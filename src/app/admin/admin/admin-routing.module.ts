import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffdeskComponent } from '../staffdesk/staffdesk.component';
import { ViewApplicationComponent } from '../view-application/view-application.component';
import { ApplicationComponent } from '../application/application.component';
import { AllStaffComponent } from '../settings/all-staff/all-staff.component';
import { ModulesSettingComponent } from '../settings/modules-setting/modules-setting.component';
import { FieldZonalOfficeComponent } from '../settings/field-zonal-office/field-zonal-office.component';
import { PhasedocumentsComponent } from '../settings/phasedocuments/phasedocuments.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'staff-dashboard', component: DashboardComponent },
  { path: 'staff-desk', component: StaffdeskComponent },
  { path: 'view-application', component: ViewApplicationComponent },
  { path: 'application', component: ApplicationComponent },
  { path: 'all-staff', component: AllStaffComponent },
  { path: 'modules-setting', component: ModulesSettingComponent },
  { path: 'field-zone-office', component: FieldZonalOfficeComponent },
  { path: 'phasedocuments', component: PhasedocumentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
