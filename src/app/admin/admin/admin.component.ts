import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, GenericService } from '../../services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {


  constructor(private router: Router, private gen: GenericService) { 
  }

  ngOnInit(): void {
  }

}
