import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-field-zonal-office',
  templateUrl: './field-zonal-office.component.html',
  styleUrls: ['./field-zonal-office.component.css']
})
export class FieldZonalOfficeComponent implements OnInit {
  offices: FieldOffice[];

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.getOffices().subscribe(result => {
      if(result.success){
        this.offices = result.data.data.offices.map(cat => cat);
      }
    });
  }

}

class FieldOffice{
  id: number
  description: string;
  address: string;
  fieldType: string;
  stateName: number;

  constructor(item: any) {
    this.id =  item.id;
    this.description = item.description;
    this.address = item.address;
    this.fieldType = item.fieldType;
    this.stateName = item.stateName;
    
  }
}