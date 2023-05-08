import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { environment } from 'src/environments/environment';

import { AuthenticationService, GenericService } from '../../shared/services';

@Component({
  templateUrl: 'paymentsum.component.html',
  styleUrls: ['./paymentsum.component.scss'],
})
export class PaymentSumComponent implements OnInit {
  genk: GenericService;
  application_id: number = null;
  paymentSummary: PaymentSummary;
  public rrr$ = new Subject<string>();
  public applicationStatus$ = new Subject<string>();
  private rrr: string;
  public isPaymentConfirmed$ = new Subject<boolean>();
  public isPaymentNotComfirmed$ = new Subject<boolean>();

  constructor(
    private gen: GenericService,
    private router: Router,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private progressbar: ProgressBarService,
    private applicationServer: ApplyService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {
    this.genk = gen;
    this.rrr$.subscribe((data) => {
      this.rrr = data;
    });
  }

  ngOnInit(): void {
    this.progressbar.open();
    this.route.params.subscribe((params) => {
      this.application_id = params['id'];
      this.getPaymentSummary();
    });
  }

  getPaymentSummary() {
    this.progressbar.open();
    this.applicationServer.getpaymentbyappId(this.application_id).subscribe({
      next: (res) => {
        if (res.success) {
          this.paymentSummary = res.data.data;
          this.rrr$.next(this.paymentSummary.rrr);
          this.applicationStatus$.next(this.paymentSummary.status);

          this.isPaymentConfirmed$.next(
            this.paymentSummary.rrr &&
              this.paymentSummary.status === 'PaymentConfirmed'
          );

          this.isPaymentNotComfirmed$.next(
            this.paymentSummary.rrr &&
              this.paymentSummary.status !== 'PaymentConfirmed'
          );
        }
        this.progressbar.close();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.progressbar.close();
        this.cd.markForCheck();
      },
    });
  }

  generateRRR() {
    this.route.params.subscribe((params) => {
      this.progressbar.open();
      this.application_id = params['id'];

      this.applicationServer.createPayment_RRR(this.application_id).subscribe({
        next: (res) => {
          if (res.success) {
            this.rrr$.next(res.data.data);

            this.isPaymentNotComfirmed$.next(
              res.data.data && this.paymentSummary.status !== 'PaymentConfirmed'
            );

            //todo: display success dialog
            this.progressbar.close();
            this.cd.markForCheck();
          }
        },
        error: (error) => {
          //todo: display error dialog
          this.progressbar.close();
          this.cd.markForCheck();
        },
      });
    });
  }

  submitPayment() {
    //this.router.navigate(['/auth/pay-online?rrr=' + this.rrr]);
    window.location.href =
      environment.apiUrl + '/auth/pay-online?rrr=' + this.rrr;
  }

  uploadDocument() {
    // window.location.href = environment.apiUrl + '/upload-document';
    this.router.navigate([`/company/upload-document/${this.application_id}`]);
  }
}

export class PaymentSummary {
  appReference: string = '';
  permitType: string = '';
  docList: string[] = [];
  facilityAddress: string = '';
  fee: string = '';
  rrr: string = '';
  serviceCharge: string = '';
  totalAmount: string = '';
  status: string = '';
}
