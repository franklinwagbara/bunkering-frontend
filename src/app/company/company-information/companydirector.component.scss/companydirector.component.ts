import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'companydirector.component.html',
  styleUrls: ['./companydirector.component.scss'],
})
export class CompanyDirectorComponent implements OnInit {
  directorForm: FormGroup;
  address: string;
  firstName: string;
  lastName: string;
  telephone: string;
  regNumber: string;
  tinNumber: string;
  yearIncorporated: string;
  nationality: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;

  constructor() {}

  ngOnInit() {
    this.directorForm = new FormGroup(
      {
        FirstName: new FormControl(this.firstName, [Validators.required]),
        LastName: new FormControl(this.lastName, [Validators.required]),
        Telephone: new FormControl(this.telephone, [Validators.required]),
        Nationality: new FormControl(this.nationality, [Validators.required]),
        Address: new FormControl(this.address, [Validators.required]),
        City: new FormControl(this.city, [Validators.required]),
        PostalCode: new FormControl(this.postalCode, [Validators.required]),
        Country: new FormControl(this.country, [Validators.required]),
        State: new FormControl(this.state, [Validators.required]),
      },
      {}
    );
  }
}
