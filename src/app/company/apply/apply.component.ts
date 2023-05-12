import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService } from '../../shared/services';

@Component({
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent {
  genk: GenericService;

  constructor(
    private gen: GenericService,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.genk = gen;
  }
}