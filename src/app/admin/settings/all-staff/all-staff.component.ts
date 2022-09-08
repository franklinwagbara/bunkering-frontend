import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-all-staff',
  templateUrl: './all-staff.component.html',
  styleUrls: ['./all-staff.component.css']
})
export class AllStaffComponent implements OnInit {
  users : staff[];
  userDetail: any;
  roles : any;
  staffList: any;
  closeResult: string;
  form: FormGroup = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    PhoneNo: new FormControl(''),
    UserRoles: new FormControl(''),
    Status: new FormControl(''),
  });

  constructor(private auth: AuthenticationService, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.auth.getAllStaff().subscribe(res => {
      this.users = res.data.data.map(staff => staff);
    });

    this.auth.getElpsStaffList().subscribe(res => {
      this.staffList = res.data.data;
    });

    this.auth.getRoles().subscribe(res => {
      this.roles = res.data.data;
    });

    this.form = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required, Validators.email],
      PhoneNo: ['', Validators.required],
      UserRoles: ['', Validators.required],
      Status: ['', Validators.required],
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

  onSubmit(){
    this.modalService.dismissAll('Cross click');
    this.auth.addStaff(this.form.value).subscribe(res =>{
      if(res.success){
        this.open("User created successfully!")
      }
    });
    
  }

  fetchSTaff(item){
    console.log(item);
    this.staffList.filter(e =>{
      if(item.target.value == e.email)
      this.setValue(e);
    });
  }

  setValue(e){
    this.form.get('FirstName').setValue(e.firstName);
    this.form.get('LastName').setValue(e.lastName);
    this.form.get('Email').setValue(e.email);
    this.form.get('PhoneNo').setValue(e.phoneNo);
    this.form.get('Status').setValue(e.status);
    this.form.get('id').setValue(e.id);
  }
}

class staff{
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  phoneNo: string;
  role: string;
  office: string;
  status: boolean;
  id: number;

  constructor(item: any){
    this.firstName = item.firstName;
    this.lastName = item.lastName;
    this.userId = item.userId;
    this.email = item.email;
    this.phoneNo = item.phoneNo;
    this.id = item.id;
    this.role = item.role;
    this.status = item.boolean;
    this.office = item.office;
  }
}