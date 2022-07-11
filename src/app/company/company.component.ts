import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService } from '../services';

@Component({
  selector: 'app-company-details',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {
  genk: GenericService;
  auth: AuthenticationService;
  showapply = false;
  showaccount = false;
  showtemplate: boolean;
  showmyapplication: any;
  modalactive = false;

  constructor(private gen: GenericService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private cd: ChangeDetectorRef) {
      this.genk = gen;
      this.auth = authenticationService;
   }

  ngOnInit(): void {

  }

  showApply() {
    if (this.showmyapplication) {
      this.showapply = false;
    } else {
      this.showapply = true;
    }
  }

  showAccount() {
    if (this.showaccount) {
      this.showaccount = false;
      //this.closeAll();
    } else {
      this.showaccount = true;
    }
  }

  showTemplate() {
    //debugger;
    if (this.showtemplate) {
      this.showtemplate = false;
    } else {
        this.showtemplate = true;
        this.cd.markForCheck();
      
    }
  }

  closeAll() {
    //debugger;
    if (this.modalactive) {
      if (this.showaccount) {
        this.showaccount = false;
      }
      if (this.showtemplate) {
        this.showtemplate = false;
      }
      if (this.showapply) {
        this.showapply = false;
      }
      this.modalactive = false;
    }
    else {
      this.modalactive = true;
    }
    this.cd.markForCheck();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/' + this.genk.home]);
  }
}


function showMyApplication() {
  throw new Error('Function not implemented.');
}
