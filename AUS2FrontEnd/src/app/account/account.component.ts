import { Component } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-root',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  title = 'AUS2FrontEnd';
  currentUsername: LoginModel;

  constructor(private auth: AuthenticationService) {
    this.currentUsername = auth.currentUserValue;
    console.log('in layout', this.currentUsername);
  }
}
