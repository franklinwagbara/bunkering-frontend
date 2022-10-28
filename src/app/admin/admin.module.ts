import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

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
import { MatGridListModule } from '@angular/material/grid-list';
import { AppStageDocsComponent } from './settings/app-stage-docs/app-stage-docs.component';
import { ProgressBarService } from '../shared/services/progress-bar.service';
import { BranchSettingComponent } from './settings/branch-setting/branch-setting.component';

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
    AppStageDocsComponent,
    BranchSettingComponent,
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    MatGridListModule,
    MatSnackBarModule,
  ],
  exports: [],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class AdminModule {}
