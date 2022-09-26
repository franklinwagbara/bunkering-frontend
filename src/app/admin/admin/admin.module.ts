import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { NgbModule, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffdeskComponent } from '../staffdesk/staffdesk.component';
import { AdminLayoutComponent } from 'src/app/layout/admin-layout/admin-layout.component';
import { ApplicationComponent } from '../application/application.component';
import { ViewApplicationComponent } from '../view-application/view-application.component';
import { SuperadminLayoutComponent } from 'src/app/layout/sidebar/superadmin-layout/superadmin-layout.component';
import { InspectorLayoutComponent } from 'src/app/layout/sidebar/inspector-layout/inspector-layout.component';
import { AllStaffComponent } from '../settings/all-staff/all-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModulesSettingComponent } from '../settings/modules-setting/modules-setting.component';
import { FieldZonalOfficeComponent } from '../settings/field-zonal-office/field-zonal-office.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    StaffdeskComponent,
    AdminLayoutComponent,
    ApplicationComponent,
    ViewApplicationComponent,
    SuperadminLayoutComponent,
    InspectorLayoutComponent,
    AllStaffComponent,
    ModulesSettingComponent,
    FieldZonalOfficeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [],
})
export class AdminModule { }
