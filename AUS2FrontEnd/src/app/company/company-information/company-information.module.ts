import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompanyProfileComponent } from './companyprofile.component';
import { CompanyInformationComponent } from './companyinformation.component';
import { CompanyAddressComponent } from './companyaddress.component';
import { CompanyDirectorComponent } from './companydirector.component';
import { CompanyInformationRoutingModule } from './company-information.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    CompanyInformationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyProfileComponent, CompanyInformationComponent, CompanyAddressComponent,
    CompanyDirectorComponent,  
  ],
  providers: [],
})
export class CompanyInformationModule { }
