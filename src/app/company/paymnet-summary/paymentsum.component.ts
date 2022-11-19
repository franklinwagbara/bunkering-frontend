import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

import { AuthenticationService, GenericService } from '../../shared/services';

@Component({
  templateUrl: 'paymentsum.component.html',
  styleUrls: ['./paymentsum.component.scss'],
})
export class PaymentSumComponent implements OnInit {
  genk: GenericService;
  application_id: number = null;
  paymentSummary: PaymentSummary;
  payment_RRR_Info: any;
  rrr: string = '';

  constructor(
    private gen: GenericService,
    private router: Router,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private progressbar: ProgressBarService,
    private applicationServer: ApplyService,
    private snackBar: MatSnackBar
  ) {
    this.genk = gen;
  }

  ngOnInit(): void {
    this.progressbar.open();
    this.route.params.subscribe((params) => {
      this.application_id = params['id'];

      this.applicationServer.getpaymentbyappId(this.application_id).subscribe({
        next: (res) => {
          if (res.success) {
            this.paymentSummary = res.data.data;
            this.rrr = this.paymentSummary.rrr;
            console.log('rrr', this.rrr);

            this.progressbar.close();
          }
        },
        error: (error) => {
          this.progressbar.close();
        },
      });
    });
  }

  generateRRR() {
    this.progressbar.open();
    this.route.params.subscribe((params) => {
      this.application_id = params['id'];

      this.applicationServer.createPayment_RRR(this.application_id).subscribe({
        next: (res) => {
          if (res.success) {
            this.payment_RRR_Info = res.data.data;
            this.rrr = this.payment_RRR_Info.rrreference;
            console.log('rrr', this.rrr, this.payment_RRR_Info, res);
            this.progressbar.close();
          }
        },
        error: (error) => {
          console.log('loging error', error);
        },
      });
    });
  }

  submitpayment() {}
}

class PaymentSummary {
  appReference: string = '';
  permitType: string = '';
  docList: string[] = [];
  facilityAddress: string = '';
  fee: string = '';
  rrr: string = '';
  serviceCharge: string = '';
  totalAmount: string = '';
}
