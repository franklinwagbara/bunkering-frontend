import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './changepassword.component';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyProfileComponent } from './companyprofile.component';
import { DashboardComponent } from './dashboard.component';
import { MessagesComponent } from './messeges.component';
import { MyScheduleComponent } from './myschedule.component';
import { MypermitsComponent } from './mypermits.component';
import { ApplyComponent } from './apply.component';
import { MyApplicationComponent } from './myapplication.component';
import { CompanyDirectorsComponent } from './companydirectors.component';
import { CompanyInformationComponent } from './companyinformation.component';
import { RegisterDirectorComponent } from './registerdirector.component';
import { CompanyComponent } from './company.component';

@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule
  ],
  declarations: [
    DashboardComponent, MessagesComponent, ChangePasswordComponent, MyScheduleComponent,
    CompanyProfileComponent, MypermitsComponent, ApplyComponent, MyApplicationComponent,
    CompanyInformationComponent, CompanyDirectorsComponent, RegisterDirectorComponent, 
    CompanyComponent
  ],
  providers: [],
})
export class CompanyModule { }

