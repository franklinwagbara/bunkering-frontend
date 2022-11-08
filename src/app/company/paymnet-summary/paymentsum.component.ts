import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService } from '../../shared/services';

@Component({
  templateUrl: 'paymentsum.component.html',
  styleUrls: ['./paymentsum.component.scss'],
})
export class PaymentSumComponent {
  genk: GenericService;

  constructor(
    private gen: GenericService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.genk = gen;
  }

  submitpayment() {}
}
