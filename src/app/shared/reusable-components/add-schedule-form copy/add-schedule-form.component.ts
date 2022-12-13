import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticationService } from '../../services';
import { ProgressBarService } from '../../services/progress-bar.service';
import { IApplication } from '../../interfaces/IApplication';
import { ApplyService } from '../../services/apply.service';
import { ApplicationActionType } from '../../constants/applicationActions';
import { Staff } from 'src/app/admin/settings/all-staff/all-staff.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-schedule-form',
  templateUrl: './add-schedule-form.component.html',
  styleUrls: ['./add-schedule-form.component.css'],
})
export class AddScheduleFormComponent implements OnInit {
  public form: FormGroup;
  public application: IApplication;
  public currentUser: Staff;

  selected: Date | null;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private appService: ApplyService,
    private progressBarService: ProgressBarService,
    private auth: AuthenticationService
  ) {
    this.application = data.data.application;

    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const tempUser = this.auth.currentUser;

    this.auth.getAllStaff().subscribe({
      next: (res) => {
        this.currentUser = res.data.data.find(
          (u) => u.email === tempUser.userId
        );

        this.progressBarService.close();
      },

      error: (error) => {
        this.snackBar.open(
          'Operation failed! Could not user information!',
          null,
          {
            panelClass: ['error'],
          }
        );

        this.progressBarService.close();
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  approve() {
    this.progressBarService.open();

    const model = {
      applicationId: this.application.id,
      currentUserId: this.currentUser.id,
      action: ApplicationActionType.Approve,
      delegatedUserId: '',
      comment: this.form.controls['comment'].value,
    };

    this.appService.processApplication(model).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open('Operation was successfully!', null, {
            panelClass: ['success'],
          });

          this.dialogRef.close();
        }

        this.progressBarService.close();
      },

      error: (error) => {
        this.snackBar.open(
          'Operation failed! Could not perform operation!',
          null,
          {
            panelClass: ['error'],
          }
        );

        this.progressBarService.close();
      },
    });
  }
}
