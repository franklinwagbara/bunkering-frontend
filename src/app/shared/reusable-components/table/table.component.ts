import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'generic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input('table_headers') headers: string[] = [];
  @Input('table_keys') keys: string[] = [];
  @Input('table_content') items: any[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('headers', this.headers);
    console.log('content', this.items);
  }
}
