import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompanyProfileComponent } from './companyprofile.component';
import { CompanyInformationComponent } from './companyinformation.component';
import { CompanyAddressComponent } from './companyaddress.component';
import { CompanyDirectorComponent } from './companydirector.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CompanyProfileComponent},
  {path: 'companyprofile', component: CompanyProfileComponent},
  //{path: 'companyinformation', component: CompanyInformationComponent},
  {path: 'companyaddress', component: CompanyAddressComponent},
  {path: 'companydirector', component: CompanyDirectorComponent}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInformationRoutingModule { }
