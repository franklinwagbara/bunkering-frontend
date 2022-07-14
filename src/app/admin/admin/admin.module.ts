import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/layout/navbar/navbar.component';
import { FooterComponent } from 'src/app/layout/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffdeskComponent } from '../staffdesk/staffdesk.component';
import { AdminLayoutComponent } from 'src/app/layout/admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    StaffdeskComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule
  ],
  exports: [],
  providers: [],
})
export class AdminModule { }