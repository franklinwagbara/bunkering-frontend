import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSource } from 'src/app/shared/constants/appSource';
import { IApplication } from 'src/app/shared/interfaces/IApplication';
import { AddScheduleFormComponent } from 'src/app/shared/reusable-components/add-schedule-form copy/add-schedule-form.component';
import { ApproveFormComponent } from 'src/app/shared/reusable-components/approve-form/approve-form.component';
import { SendBackFormComponent } from 'src/app/shared/reusable-components/send-back-form/send-back-form.component';
import { AuthenticationService } from 'src/app/shared/services';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ShowMoreComponent } from './show-more/show-more.component';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { Application } from 'src/app/company/my-applications/myapplication.component';
import { LicenceService } from 'src/app/shared/services/licence.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss'],
})
export class ViewApplicationComponent implements OnInit {
  public application: Application;
  public appActions: any;
  public appId: number;
  public appSource: AppSource;
  public licence: any;
  public currentUser: any;

  constructor(
    private snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private appService: ApplyService,
    private applicationService: ApplicationService,
    public dialog: MatDialog,
    public progressBar: ProgressBarService,
    private spinner: SpinnerService,
    public route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private licenceService: LicenceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.spinner.open();
      this.appId = parseInt(params['id']);
      this.appSource = params['appSource'];

      if (this.appSource != AppSource.Licence) this.getApplication();
      else this.getLicence();
    });

    this.currentUser = this.auth.currentUser;
  }

  public get isSupervisor() {
    return (this.currentUser as any).userRoles === 'Supervisor';
  }

  isCreatedByMe(scheduleBy: string) {
    const currentUser = this.auth.currentUser;
    return currentUser.userId == scheduleBy;
  }

  getApplication() {
    this.applicationService.viewApplication(this.appId).subscribe({
      next: (res) => {
        if (res.success) {
          this.application = res.data;
        }

        this.progressBar.close();
        this.spinner.close();
        this.cd.markForCheck();
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
        this.spinner.close();
        this.cd.markForCheck();
      },
    });
  }

  getLicence() {
    this.licenceService.getLicence(this.appId).subscribe({
      next: (res) => {
        if (res.success) {
          this.licence = res.data;
        }

        this.progressBar.close();
        this.spinner.close();
        this.cd.markForCheck();
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
        this.spinner.close();
        this.cd.markForCheck();
      },
    });
  }

  public get isStaffDesk() {
    return this.appSource == AppSource.MyDesk;
  }

  action(type: string, param = null) {
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
      editSchedule: {
        data: {
          application: this.application,
          schedule: param,
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

      this.getApplication();
    });
  }

  showMore(type: string) {
    const operationConfiguration = {
      appHistory: {
        data: {
          appHistory: this.application.appHistory,
        },
      },
      schedules: {
        data: {
          schedules: this.application.schedules,
        },
      },
      inspectionForm: {
        data: {
          inspectionForm: this.application.inspectionForm,
        },
      },
      extraPayments: {
        data: {
          extraPayments: this.application.extraPayments,
        },
      },
      applicationDocs: {
        data: {
          applicationDocs: this.application.applicationDocs,
        },
      },
    };

    let dialogRef = this.dialog.open(ShowMoreComponent, {
      data: {
        data: operationConfiguration[type].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.progressBar.open();

      this.getApplication();
    });
  }

  isPDF(filePath: string) {
    if (!filePath) return false;

    const fileType = filePath.split('.').slice(-1)[0];

    return fileType == 'pdf';
  }

  isIMG(filePath) {
    if (!filePath) return false;
    const imageTypes = ['png', 'jpg', 'jpeg', 'tiff'];

    const fileType = filePath.split('.').slice(-1)[0];

    return imageTypes.includes(fileType);
  }
}
