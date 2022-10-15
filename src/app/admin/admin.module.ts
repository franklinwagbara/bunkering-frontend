import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationComponent } from './application/application.component';
import { AllStaffComponent } from './settings/all-staff/all-staff.component';
import { FieldZonalOfficeComponent } from './settings/field-zonal-office/field-zonal-office.component';
import { ModulesSettingComponent } from './settings/modules-setting/modules-setting.component';
import { StaffdeskComponent } from './staffdesk/staffdesk.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    StaffdeskComponent,
    ApplicationComponent,
    ViewApplicationComponent,
    AllStaffComponent,
    ModulesSettingComponent,
    FieldZonalOfficeComponent,
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {}
