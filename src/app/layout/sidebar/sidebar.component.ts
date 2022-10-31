import {
  Component,
  OnInit,
  Input,
  Pipe,
  PipeTransform,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

export interface SubRouteInfo {
  id: number;
  title: string;
  url: string;
}

export interface RouteInfo {
  id: number;
  title: string;
  active: boolean;
  subMenuActive: boolean;
  iconName: string;
  iconId: string;
  iconColor: string;
  subRoutes: SubRouteInfo[];
}

const ROUTES: RouteInfo[] = [
  {
    id: 1,
    title: 'DASHBOARD',
    iconName: 'home',
    iconId: 'Outline',
    iconColor: 'yellow',
    active: true,
    subMenuActive: false,

    subRoutes: [
      {
        id: 1,
        title: 'MY DESK',
        url: '/admin',
      },
      {
        id: 2,
        title: 'STAFF DESK',
        url: '/admin/staff-desk',
      },
    ],
  },
  {
    id: 2,
    title: 'APPLICATIONS',
    iconName: 'apps',
    iconId: 'Outline',
    iconColor: 'red',
    active: false,
    subMenuActive: false,

    subRoutes: [
      {
        id: 1,
        title: 'ALL APPLICATIONS',
        url: '/admin/all-applications',
      },
    ],
  },
  {
    id: 3,
    title: 'PAYMENTS',
    iconName: 'money-bill-wave',
    iconId: 'Layer_1',
    iconColor: 'green',
    active: false,
    subMenuActive: false,

    subRoutes: [
      {
        id: 1,
        title: 'ALL PAYMENTS',
        url: '#',
      },
      {
        id: 2,
        title: 'EXTRA PAYMENTS',
        url: '#',
      },
    ],
  },
  {
    id: 4,
    title: 'REPORTS',
    iconName: 'treatment',
    iconId: 'Layer_1',
    iconColor: 'white',
    active: false,
    subMenuActive: false,

    subRoutes: [
      {
        id: 1,
        title: 'APPLICATION REPORT',
        url: '#',
      },
      {
        id: 2,
        title: 'PERMIT REPORT',
        url: '#',
      },
      {
        id: 3,
        title: 'PAYMENT REPORT',
        url: '#',
      },
    ],
  },
  {
    id: 4,
    title: 'SETTINGS',
    iconName: 'settings',
    iconId: 'Layer_1',
    iconColor: 'white',
    active: false,
    subMenuActive: false,

    subRoutes: [
      {
        id: 1,
        title: 'USER SETUP',
        url: '/admin/all-staff',
      },
      {
        id: 2,
        title: 'MODULE SETTINGS',
        url: '/admin/modules-setting',
      },
      {
        id: 3,
        title: 'APPPLICATION STAGE DOCS',
        url: '/admin/application-stage-docs',
      },
      {
        id: 4,
        title: 'FIELD/ZONAL OFFICES',
        url: '/admin/field-zone-office',
      },
      {
        id: 5,
        title: 'BRANCHES SETUP',
        url: '/admin/branch-setting',
      },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnChanges {
  user: any[];
  public menuItems: RouteInfo[];
  public submenuItems: SubRouteInfo[];
  public isCollapsed = false;
  public activeNavItem = 'DASHBOARD';
  public isSubMenuCollapsed = true;

  @Input('isCollapsed') isCollapsedInput;

  constructor(private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.isCollapsed = this.isCollapsedInput;
  }

  ngOnInit() {
    this.isCollapsed = this.isCollapsedInput;
    this.menuItems = [...ROUTES];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  setActiveNavItem(navItem: string) {
    this.activeNavItem = navItem;
    this.menuItems = this.menuItems.map((menu) => {
      if (menu.title === navItem) {
        menu.active = true;
        menu.subMenuActive = true;
      } else {
        menu.active = false;
        menu.subMenuActive = false;
      }

      return menu;
    });
    this.menuItems = [...this.menuItems];
    console.log('called', this.menuItems);
  }
}
