import { Category } from 'src/app/admin/settings/modules-setting/modules-setting.component';

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent {
  public form: FormGroup;
  public categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.categories = data.categories;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  createCategory() {
    this.auth.createModule(this.form.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.snackBar.open('Category was created successfully!', null, {
            panelClass: ['success'],
          });
          this.dialogRef.close();
        }
      },
      error: (error) => {
        console.log('error dis');
        this.snackBar.open(
          'Operation failed! Could not create the Category!',
          null,
          {
            panelClass: ['error'],
          }
        );
      },
    });
  }
}
