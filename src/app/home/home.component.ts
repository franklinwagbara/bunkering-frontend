import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuardsCheckEnd, Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, GenericService } from '../shared/services';
import { environment as envr  }from 'src/environments/environment' ;

@Component({
  selector: 'app-root',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class homeComponent implements OnInit {
  title = 'AUS2FrontEnd';
  emailModal = false;
  loginForm: FormGroup;
  email: string;
  genk: GenericService;
  appid: string;
  elpsbase: string;

  constructor(private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private gen: GenericService,
    private auth: AuthenticationService) {
      this.genk = gen;
      this.elpsbase = envr.elpsBase;
      this.appid = envr.appid;

      this.route.queryParams.subscribe(params => {
        console.log(params);
        this.email = params["email"];
        if(this.email != null){
          this.auth.login(this.email, "")
            .subscribe(result => {
              if(result.responseCode == "00"){
                if(result.data.userType == "Company"){
                  this.router.navigate(['/company/dashboard']);
                }
                else{
                  this.router.navigate(['/admin']);
                }
              }
            });
        }
      });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'Email': new FormControl(this.email, [Validators.required])
    }, {});

  }

  toggleEmailModal() {
    if (!this.emailModal) {
      this.emailModal = true;
    } else {
      this.emailModal = false;
    }
    this.cd.markForCheck();
  }
}
