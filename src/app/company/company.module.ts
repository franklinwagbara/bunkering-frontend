import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './changepassword.component';

import { CompanyRoutingModule } from './company-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MessagesComponent } from './messeges.component';
import { MyScheduleComponent } from './myschedule.component';
import { MypermitsComponent } from './mypermits.component';
import { ApplyComponent } from './apply.component';
import { MyApplicationComponent } from './myapplication.component';
import { RegisterDirectorComponent } from './registerdirector.component';
import { CompanyComponent } from './company.component';
import { UploadComponent } from './upload.component';
import { PreviewAppComponent } from './company-information/previewapp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ],
  declarations: [
    DashboardComponent, MessagesComponent, ChangePasswordComponent, MyScheduleComponent,
    MypermitsComponent, ApplyComponent, MyApplicationComponent, RegisterDirectorComponent, 
    CompanyComponent,UploadComponent, ApplyComponent, PreviewAppComponent,
  ],
  providers: [],
})
export class CompanyModule { }

