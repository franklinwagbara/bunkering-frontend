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

// interface RouteInfo {
//   id: number;
//   path: string;
//   title: string;
//   icon: string;
//   class: string;
// }

// interface SubRouteInfo extends RouteInfo {
//   routeId: number;
// }

// export const ROUTES: RouteInfo[] = [
//   {
//     id: 1,
//     path: '/admin',
//     title: 'Dashboard',
//     icon: 'ni-tv-2 text-primary',
//     class: '',
//   },
//   {
//     id: 2,
//     path: '/admin/staff-desk',
//     title: 'My Desk',
//     icon: 'ni-planet text-info',
//     class: '',
//   },
//   {
//     id: 3,
//     path: '#',
//     title: 'Application(s)',
//     icon: 'ni-pin-3 text-success',
//     class: '',
//   },
//   {
//     id: 4,
//     path: '/admin/settings',
//     title: 'Settings',
//     icon: 'fa fa-cog text-default',
//     class: '',
//   },
//   {
//     id: 5,
//     path: '/tables',
//     title: 'Tables',
//     icon: 'ni-bullet-list-67 text-red',
//     class: '',
//   },
//   {
//     id: 6,
//     path: '/login',
//     title: 'Login',
//     icon: 'ni-key-25 text-info',
//     class: '',
//   },
//   {
//     id: 7,
//     path: '/register',
//     title: 'Register',
//     icon: 'ni-circle-08 text-pink',
//     class: '',
//   },
// ];

// export const SUBROUTES: SubRouteInfo[] = [
//   {
//     id: 1,
//     routeId: 3,
//     path: '/admin/application',
//     title: 'Application(s)',
//     icon: 'ni-pin-3 text-primary',
//     class: '',
//   },
// ];

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
        url: '#',
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
        url: '#',
      },
      {
        id: 2,
        title: 'MODULE SETTINGS',
        url: '/admin/settings',
      },
      {
        id: 3,
        title: 'APPPLICATION STAGE DOCS',
        url: '#',
      },
      {
        id: 4,
        title: 'FIELD/ZONAL OFFICES',
        url: '#',
      },
      {
        id: 5,
        title: 'BRANCHES SETUP',
        url: '#',
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
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.menuItems = [...ROUTES];
    // this.router.events.subscribe((event) => {
    //   this.isCollapsed = true;
    // });
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
