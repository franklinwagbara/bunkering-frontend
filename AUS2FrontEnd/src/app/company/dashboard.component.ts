import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { AuthenticationService } from '../services';
import { GenericService } from '../services/generic.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['company.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'AUS2FrontEnd';
  showapply = false;
  showaccount = false;
  generic: GenericService;
  currentUsername: LoginModel;

  constructor(
    private gen: GenericService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.generic = gen;
    this.currentUsername = auth.currentUserValue;
  }

  ngOnInit(): void {}

  showApply() {
    if (this.showapply) {
      this.showapply = false;
    } else {
      this.showapply = true;
    }
  }

  showAccount() {
    if (this.showaccount) {
      this.showaccount = false;
    } else {
      this.showaccount = true;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/' + this.generic.home]);
  }
}
