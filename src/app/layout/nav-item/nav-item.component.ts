import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit {
  public active = false;
  public isSubMenuCollapsed = true;
  public title = '';
  public subItems = null;

  @Input('title') titleProp;
  @Input('active') activeProp;
  @Input('sub-items') subItemsProp: string[];

  constructor() {}

  ngOnInit(): void {
    this.title = this.titleProp || 'DASHBOARD';
    this.active = this.activeProp || true;
    this.subItems = this.subItemsProp || ['item1', 'item2', 'item3'];
  }

  setActiveNavItem(navItem: string) {
    this.isSubMenuCollapsed = !this.isSubMenuCollapsed;
  }
}
