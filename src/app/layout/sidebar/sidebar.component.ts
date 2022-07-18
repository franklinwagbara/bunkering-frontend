import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';

interface RouteInfo {
    id: number;
    path: string;
    title: string;
    icon: string;
    class: string;
}

interface SubRouteInfo extends RouteInfo{
  routeId: number;
}

export const ROUTES: RouteInfo[] = [
    { id: 1, path: '/admin', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { id: 2, path: '/admin/staff-desk', title: 'My Desk',  icon:'ni-planet text-info', class: '' },
    { id: 3, path: '#', title: 'Application(s)',  icon:'ni-pin-3 text-success', class: '' },
    { id: 4, path: '/admin/settings', title: 'Settings',  icon:'fa fa-cog text-default', class: '' },
    { id: 5, path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { id: 6, path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { id: 7, path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

export const SUBROUTES: SubRouteInfo[] = [
  { id: 1, routeId: 3, path: '/admin/application', title: 'Application(s)',  icon:'ni-pin-3 text-primary', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user : any[];
  public menuItems: any[];
  public submenuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.user = JSON.parse(localStorage.getItem("currentUser"));
  }
}
