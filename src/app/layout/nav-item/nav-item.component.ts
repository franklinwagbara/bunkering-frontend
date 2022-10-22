import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  public iconN = '';

  @Input('title') titleProp: string;
  @Input('active') activeProp: boolean;
  @Input('sub-items') subItemsProp: string[];
  @Input('icon-name_svg') iconName: string;
  @Input('icon-id_svg') iconId: string;
  @Input('icon-color') iconColor: string = 'black';

  @Output('onActive') onActive = new EventEmitter();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // iconRegistry.addSvgIcon(
    //   'my-star-icon',
    //   sanitizer.bypassSecurityTrustResourceUrl('../../../assets/svgs/apps.svg')
    // );
    this.iconN = `assets/svgs/${this.iconName}.svg#${this.iconId}`;
  }

  ngOnInit(): void {
    this.title = this.titleProp || 'DASHBOARD';
    this.active = this.activeProp || true;
    this.subItems = this.subItemsProp || ['item1', 'item2', 'item3'];
  }

  setActiveNavItem(navItem: string) {
    this.isSubMenuCollapsed = !this.isSubMenuCollapsed;
    this.active = !this.active;
    this.onActive.emit(this.active);
  }
}
