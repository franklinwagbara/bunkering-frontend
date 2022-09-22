import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatNumber } from '@angular/common';


@Component({
  selector: 'app-modules-setting',
  templateUrl: './modules-setting.component.html',
  styleUrls: ['./modules-setting.component.css']
})
export class ModulesSettingComponent implements OnInit {
category: Category[];
phases: Phases[]; 
closeResult: string;
form: FormGroup = new FormGroup({
  Name: new FormControl(''),
  ShortName: new FormControl(''),
  Code: new FormControl(''),
  Description: new FormControl(''),
  CategoryId: new FormControl(''),
  Sort: new FormControl(''),
  Fee: new FormControl(''),
  ServiceCharge: new FormControl('', ),
});


  constructor(
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.auth.getPhaseCategories().subscribe(result => {
      if(result.success){
        this.category = result.data.data.allModules.map(cat => cat);
        this.phases = result.data.data.allPermits.map(phase => phase);
      }
    });

    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      ShortName: ['', Validators.required],
      Code: ['', Validators.required],
      Description: ['', Validators.required],
      CategoryId: ['', Validators.required, Validators.pattern(/^\d+$/)],
      Sort: ['', Validators.required],
      Fee: ['', Validators.required],
      ServiceCharge: ['', Validators.required],
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

  createModule(){
    this.modalService.dismissAll('Cross click');
    this.auth.createModule(this.form.value).subscribe(result => {
      if(result.success){
        this.category = result.data.data.map(staff => staff);
      }
    });
  }

  createPhase(){
    this.auth.createPhase(this.form.value).subscribe(result => {
      if(result.success){
        this.category = result.data.data.allModules.map(cat => cat);
        this.phases = result.data.data.allPermits.map(phase => phase);
        this.modalService.dismissAll('Cross click');
      }
    });
  }

}

class Category
{
  moduleId: number;
  name: string;
  code: string;
  description: string;

  constructor(item: any) {
    this.moduleId = item.moduleId
    this.code = item.code;
    this.name = item.name;
    this.description = item.description;
  }
}

class Phases{
  id: number;
  categoryId: number;
  shortName: string;
  code: string;
  sort: number;
  categoryName: string;
  description: string;
  status: boolean;
  fee: number;
  serviceCharge: number

  constructor(item: any) {
    this.id = item.id
    this.categoryId = item.categoryId;
    this.code = item.code;
    this.shortName = item.shortName;
    this.sort = item.sort;
    this.categoryName = item.categoryName;
    this.description = item.description;
    this.status = item.status;
    this.fee = item.fee;
    this.serviceCharge = item.serviceCharge;
  }
}