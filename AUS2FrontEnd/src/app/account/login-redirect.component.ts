import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuardsCheckEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService, GenericService } from '../services';

@Component({
  selector: 'app-root',
  template: '<div>Redirecting</div>',
  styleUrls: ['../home/home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRedirectComponent implements OnInit {
  title = 'AUS2FrontEnd';
  emailModal = false;
  loginForm: FormGroup;
  email: string;
  genk: GenericService;

  constructor(private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private gen: GenericService,
    private auth: AuthenticationService) {
      this.genk = gen;

      // this.route.params.subscribe(params => {
      //   console.log(params); // { orderby: "price" }
      //   this.email = params["email"];
      //   //console.log(this.orderby); // price
      //   if(this.email != null){
      //     this.auth.login(this.email)
      //       .subscribe(result => {
      //         this.router.navigate(['/' + this.genk.company, 'dashboard']);
      //       });
      //   }
      // });
  }

  ngOnInit(): void {
    this.cd.markForCheck();
    this.route.queryParams.subscribe((params: Params) => {
            this.email = params['email'];
      });
      this.login();
  }

  login() {
    //debugger;
    this.auth.login(this.email, this.genk.authCode)
    .subscribe(result => {
      this.router.navigate(['/' + this.genk.company, 'dashboard']);
    });
  }
}
