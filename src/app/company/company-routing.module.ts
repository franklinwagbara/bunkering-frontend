import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyComponent } from './apply.component';
import { ChangePasswordComponent } from './changepassword.component';
import { DashboardComponent } from './dashboard.component';
import { MessagesComponent } from './messeges.component';
import { MyApplicationComponent } from './myapplication.component';
import { MyScheduleComponent } from './myschedule.component';
import { MypermitsComponent } from './mypermits.component'
import { RegisterDirectorComponent } from './registerdirector.component';
import { SubmitSurveyComponent } from './submitsurvey.component';
import { CompanyInformationComponent } from './company-information/companyinformation.component';
import { UploadComponent } from './upload.component';
import { PreviewAppComponent } from './previewapp.component';
import { PaymentSumComponent } from './paymentsum.component';

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'messages', component: MessagesComponent},
    {path: 'myschedule', component: MyScheduleComponent},
    {path: 'changepassword', component: ChangePasswordComponent},
    {path: 'mypermits', component: MypermitsComponent},
    {path: 'apply', component: ApplyComponent},
    {path: 'myapplication', component: MyApplicationComponent},
    {path: 'registerdirector', component: RegisterDirectorComponent},
    {path: 'submitsurvey', component: SubmitSurveyComponent},
    {path: 'upload', component: UploadComponent},
    {path: 'previewapp/:id', component: PreviewAppComponent},
    {path: 'paymentsum/:id', component: PaymentSumComponent},
    

    {
      path: 'companyinformation',
      component: CompanyInformationComponent,
      loadChildren: () => import('./company-information/company-information.module').then(m => m.CompanyInformationModule)
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
