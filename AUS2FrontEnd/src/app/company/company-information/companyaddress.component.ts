import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'companyaddress.component.html',
  styleUrls: ['../company.component.scss']})

export class CompanyAddressComponent implements OnInit {
addressForm: FormGroup;
streetAddress: string;
city: string;
state: string;
postalCode: string;
country: string;

constructor() {

}

  ngOnInit() {
    this.addressForm = new FormGroup(
      {
        'StreetAddress': new FormControl(this.streetAddress, [Validators.required]),
        'City': new FormControl(this.city, [Validators.required]),
        'State': new FormControl(this.state, [Validators.required]),
        'PostalCode': new FormControl(this.postalCode, [Validators.required]),
        'Country': new FormControl(this.country, [Validators.required]),
      }, {}
    );
  }

}
