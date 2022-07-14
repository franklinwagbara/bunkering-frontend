import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'companyprofile.component.html',
  styleUrls: ['../company.component.scss']})

export class CompanyProfileComponent implements OnInit {
profileForm: FormGroup;
companyName: string;
businessType: string;
companyEmail: string;
firstName: string;
lastName: string;
telephone: string;
regNumber: string;
tinNumber: string;
yearIncorporated: string;
nationality: string;
totalAssets: string;
noOfStaff: number;
yearlyRevenue: number;
noofExpertriates: number;

constructor() {

}

  ngOnInit() {
    this.profileForm = new FormGroup(
      {
        'FirstName': new FormControl(this.firstName, [Validators.required]),
        'LastName': new FormControl(this.lastName, [Validators.required]),
        'Telephone': new FormControl(this.telephone, [Validators.required]),
        'Nationality': new FormControl(this.nationality, [Validators.required]),
        'TotalAssets': new FormControl(this.totalAssets, [Validators.required]),
        'NoOfStaff': new FormControl(this.noOfStaff, [Validators.required]),
        'YearlyRevenue': new FormControl(this.yearlyRevenue, [Validators.required]),
        'NoofExpertriates': new FormControl(this.noofExpertriates, [Validators.required])
      }, {}
    );
  }

}
