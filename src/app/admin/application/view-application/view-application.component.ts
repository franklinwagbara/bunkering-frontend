import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { IApplication } from '../application.component';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  public application: IApplication;

  constructor(
    public dialogRef: MatDialogRef<ViewApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    public dialog: MatDialog,
    public progressBar: ProgressBarService
  ) {
    this.application = data?.data?.application;
    // console.log('application...', this.application);
  }

  ngOnInit(): void {
    console.log('initializing viewapplication');
  }
}
