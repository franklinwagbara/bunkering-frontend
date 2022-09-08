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
import { SuperadminLayoutComponent } from 'src/app/layout/superadmin-layout/superadmin-layout.component';
import { InspectorLayoutComponent } from 'src/app/layout/inspector-layout/inspector-layout.component';
import { AllStaffComponent } from '../all-staff/all-staff.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    AllStaffComponent
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
