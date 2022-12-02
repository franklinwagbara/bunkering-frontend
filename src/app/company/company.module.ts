import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyRoutingModule } from './company-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messeges.component';
import { MyScheduleComponent } from './schedules/myschedule.component';
import { MypermitsComponent } from './permits/mypermits.component';
import { ApplyComponent } from './apply/apply.component';
import { MyApplicationComponent } from './my-applications/myapplication.component';
import { RegisterDirectorComponent } from './director/registerdirector.component';
import { CompanyComponent } from './company.component';
import { UploadComponent } from './apply/upload.component';
import { PreviewAppComponent } from './apply/edit-preview/previewapp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentSumComponent } from './paymnet-summary/paymentsum.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { AdditionalDocListFormComponent } from './document-upload/additional-doc-list-form/additional-doc-list-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    LayoutModule,
    SharedModule,
    MatButtonModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule,
  ],
  declarations: [
    DashboardComponent,
    MessagesComponent,
    ChangePasswordComponent,
    MyScheduleComponent,
    MypermitsComponent,
    ApplyComponent,
    MyApplicationComponent,
    RegisterDirectorComponent,
    CompanyComponent,
    UploadComponent,
    ApplyComponent,
    PreviewAppComponent,
    PaymentSumComponent,
    DocumentUploadComponent,
    AdditionalDocListFormComponent,
  ],
  providers: [],
})
export class CompanyModule {}
