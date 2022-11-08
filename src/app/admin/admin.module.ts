import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProgressBarService } from '../shared/services/progress-bar.service';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationViewTableComponent } from './application/view-application/application-view-table/application-view-table.component';
import { ViewApplicationComponent } from './application/view-application/view-application.component';
import { AllStaffComponent } from './settings/all-staff/all-staff.component';
import { AppStageDocsComponent } from './settings/app-stage-docs/app-stage-docs.component';
import { BranchSettingComponent } from './settings/branch-setting/branch-setting.component';
import { FieldZonalOfficeComponent } from './settings/field-zonal-office/field-zonal-office.component';
import { ModulesSettingComponent } from './settings/modules-setting/modules-setting.component';
import { StaffdeskComponent } from './staffdesk/staffdesk.component';
import { AppProcessComponent } from './settings/app-process/app-process.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    StaffdeskComponent,
    ApplicationComponent,
    AllStaffComponent,
    ModulesSettingComponent,
    FieldZonalOfficeComponent,
    AppStageDocsComponent,
    BranchSettingComponent,
    ApplicationViewTableComponent,
    ViewApplicationComponent,
    AppProcessComponent,
  ],

  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    MatGridListModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  exports: [],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
})
export class AdminModule {}
