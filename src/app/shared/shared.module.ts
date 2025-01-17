import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
// import { MatNativeDateModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

import { FormDialogComponent } from './reusable-components/form-dialog/form-dialog.component';
import { PhaseFormComponent } from './reusable-components/phase-form/phase-form.component';
import { TableComponent } from './reusable-components/table/table.component';
import { CategoryFormComponent } from './reusable-components/category-form/category-form.component';
import { StageFormComponent } from './reusable-components/stage-form/stage-form.component';
import { ProgressBarComponent } from './reusable-components/progress-bar/progress-bar.component';
import { PermitStageFormComponent } from './reusable-components/permit-stage-form/permit-stage-form.component';
import { PermitStageDocFormComponent } from './reusable-components/permit-stage-doc-form/permit-stage-doc-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FieldOfficeFormComponent } from './reusable-components/field-office-form/field-office-form.component';
import { BranchFormComponent } from './reusable-components/branch-form/branch-form.component';
import { UserFormComponent } from './reusable-components/user-form/user-form.component';
import { ApplicationProcessFormComponent } from './reusable-components/application-process-form/application-process-form.component';
import { MoveApplicationFormComponent } from './reusable-components/move-application-form/move-application-form.component';
import { ApproveFormComponent } from './reusable-components/approve-form/approve-form.component';
import { SendBackFormComponent } from './reusable-components/send-back-form/send-back-form.component';
import { AddScheduleFormComponent } from './reusable-components/add-schedule-form copy/add-schedule-form.component';
import { FlatTableComponent } from './reusable-components/flat-table/flat-table.component';
import { SpinnerComponent } from './reusable-components/spinner/spinner.component';
import { AssignApplicationFormComponent } from './reusable-components/assign-application-form/assign-application-form.component';
import { SvgIconComponent } from './reusable-components/svg-icon/svg-icon.component';
import { DropdownComponent } from './reusable-components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    TableComponent,
    FormDialogComponent,
    PhaseFormComponent,
    CategoryFormComponent,
    StageFormComponent,
    ProgressBarComponent,
    PermitStageFormComponent,
    PermitStageDocFormComponent,
    FieldOfficeFormComponent,
    BranchFormComponent,
    UserFormComponent,
    ApplicationProcessFormComponent,
    MoveApplicationFormComponent,
    ApproveFormComponent,
    SendBackFormComponent,
    AddScheduleFormComponent,
    FlatTableComponent,
    SpinnerComponent,
    AssignApplicationFormComponent,
    SvgIconComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  exports: [
    TableComponent,
    SpinnerComponent,
    FlatTableComponent,
    FormDialogComponent,
    PhaseFormComponent,
    ProgressBarComponent,
    SvgIconComponent,
    DropdownComponent,
  ],
})
export class SharedModule {}
