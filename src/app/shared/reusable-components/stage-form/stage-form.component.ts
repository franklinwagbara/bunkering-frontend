import {
  PermitStage,
  Phase,
} from 'src/app/admin/settings/modules-setting/modules-setting.component';

import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AdminService } from '../../services/admin.service';
import { AppException } from '../../exceptions/AppException';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css'],
})
export class StageFormComponent {
  public form: FormGroup;
  public phases: Phase[];
  public permitStage: PermitStage[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StageFormComponent>,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.phases = data.data.phases;
    this.permitStage = data.data.permitStages;

    console.log('checking', this.phases, this.permitStage);

    this.form = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      phaseId: ['', [Validators.required, Validators.pattern(/^\d+$/)]], //Asyc validation
      fee: ['', Validators.required],
      serviceCharge: ['', Validators.required],
      sort: ['', Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  createPermitStage() {
    this.adminService.createPermitStage(this.form.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open('Permit stage was created successfully!', null, {
            panelClass: ['success'],
          });
          this.dialogRef.close();
        }
      },
      error: (error: AppException) => {
        this.snackBar.open(error.message, null, {
          panelClass: ['error'],
        });
      },
    });
  }
}
