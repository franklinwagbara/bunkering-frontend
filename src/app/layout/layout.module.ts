import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InspectorLayoutComponent } from './sidebar/inspector-layout/inspector-layout.component';
import { SuperadminLayoutComponent } from './sidebar/superadmin-layout/superadmin-layout.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InspectorLayoutComponent,
    SuperadminLayoutComponent,
    NavItemComponent,
    TopNavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
  ],
  exports: [
    AdminLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InspectorLayoutComponent,
    SuperadminLayoutComponent,
  ],
})
export class LayoutModule {}
