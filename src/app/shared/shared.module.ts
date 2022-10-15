import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './reusable-components/table/table.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, LayoutModule],
  providers: [],
  exports: [TableComponent],
})
export class SharedModule {}
