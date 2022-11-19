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
  paymentSummary: any;

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
            this.progressbar.close();
          }
        },
        error: (error) => {
          this.progressbar.close();
        },
      });
    });
  }

  submitpayment() {}
}
