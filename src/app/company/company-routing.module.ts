import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './apply.component';
import { ChangePasswordComponent } from './changepassword.component';
import { CompanyDirectorsComponent } from './companydirectors.component';
import { CompanyInformationComponent } from './companyinformation.component';
import { CompanyProfileComponent } from './companyprofile.component';
import { DashboardComponent } from './dashboard.component';
import { MessagesComponent } from './messeges.component';
import { MyApplicationComponent } from './myapplication.component';
import { MyScheduleComponent } from './myschedule.component';
import { PermitsComponent } from './permits.component'
import { RegisterDirectorComponent } from './registerdirector.component';
import { SubmitSurveyComponent } from './submitsurvey.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'myschedule', component: MyScheduleComponent},
    {path: 'changepassword', component: ChangePasswordComponent},
    {path: 'companyprofile', component: CompanyProfileComponent},
    {path: 'permits', component: PermitsComponent},
    {path: 'apply', component: ApplyComponent},
    {path: 'myapplication', component: MyApplicationComponent},
    {path: 'companyinformation', component: CompanyInformationComponent},
    {path: 'companydirectors', component: CompanyDirectorsComponent},
    {path: 'registerdirectors', component: RegisterDirectorComponent},
    {path: 'submitsurvey', component: SubmitSurveyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
