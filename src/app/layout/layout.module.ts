import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { InspectorLayoutComponent } from './sidebar/inspector-layout/inspector-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SuperadminLayoutComponent } from './sidebar/superadmin-layout/superadmin-layout.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent,
    InspectorLayoutComponent,
    SuperadminLayoutComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent
  ],
  providers: [],
})
export class LayoutModule { }

