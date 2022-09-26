import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services';
import { ApplyService } from 'src/app/services/apply.service';

@Component({
  selector: 'app-field-zonal-office',
  templateUrl: './field-zonal-office.component.html',
  styleUrls: ['./field-zonal-office.component.css']
})
export class FieldZonalOfficeComponent implements OnInit {
  offices: FieldOffice[];
  closeResult: string;
  stateList: any;
  form: FormGroup = new FormGroup({
    Name: new FormControl(''),
    StateName: new FormControl(''),
    Address: new FormControl(''),
    StateId: new FormControl('')
  });
  
  constructor(
    private auth: AuthenticationService, 
    private modalService: NgbModal,
    private apply: ApplyService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.auth.getOffices().subscribe(result => {
      if(result.success){
        this.offices = result.data.data.offices.map(cat => cat);
      }
    });
    
    this.apply.getStateList().subscribe(result => {
      if(result.success){
        this.stateList = result.data.data;
      }
    });

    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      StateName: ['', Validators.required],
      Address: ['', Validators.required],
      StateId: ['', Validators.required, Validators.pattern(/^\d+$/)]
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addFieldOffice(){
    this.auth.addFieldOffice(this.form.value).subscribe(result => {
      if(result.success){
        this.offices = result.data.data.offices.map(cat => cat);
      }
    });

  }

}

class FieldOffice{
  id: number
  name: string;
  address: string;
  stateName: string;
  stateId: number;

  constructor(item: any) {
    this.id =  item.id;
    this.name = item.name;
    this.address = item.address;
    this.stateId = item.stateId;
    this.stateName = item.stateName;
    
  }
}