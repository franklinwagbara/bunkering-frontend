import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  public isCollapse: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onMenuOpen(open: Event) {
    this.isCollapse = !this.isCollapse;
    console.log(open);
  }
}
