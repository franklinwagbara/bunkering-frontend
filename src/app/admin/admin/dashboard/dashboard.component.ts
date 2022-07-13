import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private generic: GenericService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getStaffDashboard()
      .subscribe(result => {
        var data = result;
      });
  }

  logout(): void{
    this.auth.logout();
    this.router.navigate(['/' + this.generic.home]);
  }

}
