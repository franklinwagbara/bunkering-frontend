import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppSource } from 'src/app/shared/constants/appSource';
import { IApplication } from 'src/app/shared/interfaces/IApplication';
import { AddScheduleFormComponent } from 'src/app/shared/reusable-components/add-schedule-form copy/add-schedule-form.component';
import { ApproveFormComponent } from 'src/app/shared/reusable-components/approve-form/approve-form.component';
import { SendBackFormComponent } from 'src/app/shared/reusable-components/send-back-form/send-back-form.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  public application: IApplication;
  public appActions: any;
  public appId: number;
  public appSource: AppSource;

  appHistoryKeysMappedToHeaders = {
    actionBy: 'Action By',
    actionTo: 'Action To',
    comment: 'Remark',
    date: 'Date',
  };

  constructor(
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private appService: ApplyService,
    public dialog: MatDialog,
    public progressBar: ProgressBarService,
    public route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.route.queryParams.subscribe((params) => {
      this.appId = parseInt(params['id']);

      this.getApplication().subscribe({
        next: (res) => {
          if (res.success) {
            this.application = res.data.data;
          }

          this.progressBar.close();
        },
        error: (error) => {
          this.snackBar.open(
            'Something went wrong while retrieving data.',
            null,
            {
              panelClass: ['error'],
            }
          );

          this.progressBar.close();
        },
      });
    });
  }

  ngOnInit(): void {
    console.log('initializing viewapplication');
  }

  getApplication() {
    return this.appService.viewApplication(this.appId);
  }

  action(type: string) {
    const operationConfiguration = {
      approve: {
        data: {
          application: this.application,
        },
        form: ApproveFormComponent,
      },
      sendBack: {
        data: {
          application: this.application,
        },
        form: SendBackFormComponent,
      },
      addSchedule: {
        data: {
          application: this.application,
        },
        form: AddScheduleFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration[type].form, {
      data: {
        data: operationConfiguration[type].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.progressBar.open();

      this.getApplication().subscribe((res) => {
        this.application = res.data.data;

        this.progressBar.close();
        this.cd.markForCheck();
      });
    });
  }
}
