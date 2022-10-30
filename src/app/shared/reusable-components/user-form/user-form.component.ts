import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { ProgressBarService } from '../../services/progress-bar.service';

import { Staff } from 'src/app/admin/settings/all-staff/all-staff.component';
import { FieldOffice } from 'src/app/admin/settings/field-zonal-office/field-zonal-office.component';
import { IBranch } from '../../interfaces/IBranch';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public usersFromAus2: StaffWithName[];
  public userTypes = [''];
  public offices: FieldOffice[];
  public branches: IBranch[];
  public roles: any;
  public usersFromElps: StaffWithName[];
  public file: File | null = null;
  public selectedUserFromElps: StaffWithName;
  public usersDropdownSettings: IDropdownSettings = {};
  public closeDropdownSelection = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private progressBar: ProgressBarService
  ) {
    this.usersFromAus2 = data.data.users;
    this.offices = data.data.offices;
    this.branches = data.data.branches;
    this.roles = data.data.roles;
    this.usersFromElps = data.data.staffList;

    //Appending an additional name field to allow interfacing with the ngmultiple-select textField
    this.usersFromElps = this.usersFromElps.map((user) => {
      user.name = `${user.lastName}, ${user.firstName} (${user.email})`;
      return user;
    });

    this.form = this.formBuilder.group({
      elpsId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: [''],
      userType: [''],
      role: ['', Validators.required],
      officeId: ['', Validators.required],
      branchId: ['', Validators.required],
      status: [false, Validators.required],
      signatureImage: [''],
    });
  }

  ngOnInit(): void {
    this.usersDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSelection,
    };
  }

  createUser() {
    this.progressBar.open();

    this.form.controls['elpsId'].setValue(this.selectedUserFromElps.id);

    const formDataToSubmit = new FormData();

    formDataToSubmit.append('elpsId', this.form.get('elpsId').value);
    formDataToSubmit.append('firstName', this.form.get('firstName').value);
    formDataToSubmit.append('lastName', this.form.get('lastName').value);
    formDataToSubmit.append('email', this.form.get('email').value);
    formDataToSubmit.append('phoneNo', this.form.get('phoneNo').value);
    formDataToSubmit.append('userType', this.form.get('userType').value);
    formDataToSubmit.append('userRole', this.form.get('role').value);
    formDataToSubmit.append('officeId', this.form.get('officeId').value);
    formDataToSubmit.append('branchId', this.form.get('branchId').value);
    formDataToSubmit.append('status', this.form.get('status').value);
    formDataToSubmit.append('signatureImage', this.file);

    this.adminService.createStaff(formDataToSubmit).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open('Staff was created successfully!', null, {
            panelClass: ['success'],
          });

          this.dialogRef.close();
        }
      },
      error: (error) => {
        this.snackBar.open(
          'Operation failed! Could not create the Staff account.',
          null,
          {
            panelClass: ['error'],
          }
        );
        this.progressBar.close();
      },
    });
  }

  onClose() {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onItemSelect(event: ListItem) {
    this.selectedUserFromElps = this.usersFromElps.find(
      (u) => u.id === event.id
    );

    this.setFormValues(this.selectedUserFromElps);
  }

  onSelectAll(event: ListItem[]) {
    event.forEach((item) => {
      (this.form.get('docId') as FormArray).push(new FormControl(item.id));
    });
  }

  toggleCloseDropdownSelection() {
    this.closeDropdownSelection = !this.closeDropdownSelection;
    this.usersDropdownSettings = Object.assign({}, this.usersDropdownSettings, {
      closeDropDownOnSelection: this.closeDropdownSelection,
    });
  }

  onDeSelect(event: ListItem) {
    const targetIndex = (
      (this.form.get('docId') as FormArray).value as Array<number>
    ).indexOf(event.id as number);
    (this.form.get('docId') as FormArray).removeAt(targetIndex);
  }

  setFormValues(user: StaffWithName) {
    this.form.controls['firstName'].setValue(user.firstName);
    this.form.controls['lastName'].setValue(user.lastName);
    this.form.controls['email'].setValue(user.email);
    this.form.controls['phoneNo'].setValue(user.phoneNo);
    this.form.controls['userType'].setValue('Staff');
  }
}

interface StaffWithName extends Staff {
  name: string;
}
