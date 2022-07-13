import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
// import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent
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
