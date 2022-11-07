import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanySErvice } from 'src/app/shared/services/company.service';


@Component({
  templateUrl: 'myapplication.component.html',
  styleUrls: ['../company.component.scss']})

export class MyApplicationComponent implements OnInit {
  applications: Application[];
  tableTitles = {
    app: 'My Applications',
  };

  applicationTableKeysMappedToHeaders = {
    appReference: 'Ap. pReference',
    facilityAddress: 'Address/Location',
    status: 'Status',
  };
  /**
   *
   */
  constructor(
    private cd: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _company: CompanySErvice) {
    
  }

  ngOnInit(): void {
    this._company.getCompanyApplications().subscribe(res => {
      if(res.success)
      {
        this.applications = res.data.data.map((app) => app);
        this.cd.markForCheck();
      }
    });
  }
  
  
}

interface Application{
  AppReference: string;
  AddedDate: Date;
  CompanyName: string;
  FacilityName: string;
  FacilityAddress: string;
  GpsCordinates: string;
  StateName: string;
  RRR: string;
  Status: string;
  AppType: string;
  PermitType: string;
}
