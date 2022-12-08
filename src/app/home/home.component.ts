import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuardsCheckEnd, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, GenericService } from '../shared/services';
import { environment as envr } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class homeComponent implements OnInit {
  title = 'AUS2FrontEnd';
  emailModal = false;
  loginForm: FormGroup;
  email: string;
  genk: GenericService;
  appid: string;
  elpsbase: string;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private gen: GenericService,
    private auth: AuthenticationService
  ) {
    this.genk = gen;
    this.elpsbase = envr.elpsBase;
    this.appid = envr.appid;

    // if (auth.isLoggedIn) return;

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log('loggged in ', this.auth.isLoggedIn);
      // debugger;
      if (!this.auth.isLoggedIn) {
        this.auth
          .login
          // this.email, ''
          ()
          .subscribe((user) => {
            if (user) {
              let returnUrl =
                this.route.snapshot.queryParamMap.get('returnUrl');

              if (user.userType == 'Company') {
                this.router.navigate([returnUrl || '/company/dashboard']);
              } else {
                this.router.navigate([returnUrl || '/admin']);
              }
            }
          });
      }
    });
  }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   'Email': new FormControl(this.email, [Validators.required])
    // }, {});
  }

  // toggleEmailModal() {
  //   if (!this.emailModal) {
  //     this.emailModal = true;
  //   } else {
  //     this.emailModal = false;
  //   }
  //   this.cd.markForCheck();
  // }
}
