import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
import { AppException } from '../../exceptions/AppException';
import { AdminService } from '../../services/admin.service';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { ProgressBarService } from '../../services/progress-bar.service';
import { Staff } from 'src/app/admin/settings/all-staff/all-staff.component';

@Component({
  selector: 'app-move-application-form',
  templateUrl: './move-application-form.component.html',
  styleUrls: ['./move-application-form.component.css'],
})
export class MoveApplicationFormComponent implements OnInit {
  public form: FormGroup;
  public staffs: StaffWithName[];
  public selectedStaffs = [];
  public staffsDropdownSettings: IDropdownSettings = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MoveApplicationFormComponent>,
    private snackBar: MatSnackBar,
    private adminServe: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private progressBar: ProgressBarService,
    private cd: ChangeDetectorRef
  ) {
    this.staffs = data.data.staffs;

    console.log('staffs', this.staffs);

    //Appending an additional name field to allow interfacing with the ngmultiple-select textField
    this.staffs = this.staffs?.map((user) => {
      user.name = `${user?.lastName}, ${user?.firstName} (${user?.email})`;
      return user;
    });

    this.form = this.formBuilder.group({
      newStaffEmail: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.staffsDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  onClose() {
    this.dialogRef.close();
  }

  createPermitStageDoc() {
    this.progressBar.open();

    this.adminServe.createStageDocs(this.form.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open(
            'Permit Stage document was created successfull!',
            null,
            {
              panelClass: ['success'],
            }
          );

          this.dialogRef.close();
        }

        this.progressBar.close();
        this.cd.markForCheck();
      },
      error: (error: AppException) => {
        this.snackBar.open(error.message, null, {
          panelClass: ['error'],
        });
        this.progressBar.close();
        this.cd.markForCheck();
      },
    });
  }

  onItemSelect(event: ListItem) {
    (this.form.get('docId') as FormArray).push(new FormControl(event.id));
  }

  onSelectAll(event: ListItem[]) {
    event.forEach((item) => {
      (this.form.get('docId') as FormArray).push(new FormControl(item.id));
    });
  }

  onDeSelect(event: ListItem) {
    const targetIndex = (
      (this.form.get('docId') as FormArray).value as Array<number>
    ).indexOf(event.id as number);
    (this.form.get('docId') as FormArray).removeAt(targetIndex);
  }
}

interface StaffWithName extends Staff {
  name: string;
}
