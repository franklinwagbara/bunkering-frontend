import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { AppSource } from 'src/app/shared/constants/appSource';
import { IApplication } from 'src/app/shared/interfaces/IApplication';
import { IBranch } from 'src/app/shared/interfaces/IBranch';
import { AssignApplicationFormComponent } from 'src/app/shared/reusable-components/assign-application-form/assign-application-form.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { Staff } from '../../settings/all-staff/all-staff.component';
import { FieldOffice } from '../../settings/field-zonal-office/field-zonal-office.component';
import { Category } from '../../settings/modules-setting/modules-setting.component';

@Component({
  selector: 'app-my-desk',
  templateUrl: './my-desk.component.html',
  styleUrls: ['./my-desk.component.css'],
})
export class MyDeskComponent implements OnInit {
  public applications: IApplication[];
  public applications$ = new Subject<IApplication[]>();
  public categories: Category[] = [];
  public categories$ = new Subject<Category[]>();

  public users: Staff[];
  public userDetail: any;
  public roles: any;
  public staffList: any;
  public offices: FieldOffice[];
  public branches: IBranch[];

  public tableTitles = {
    applications: 'All Applications',
  };

  public applicationKeysMappedToHeaders = {
    appReference: 'Reference Number',
    companyName: 'Company Name',
    appType: 'Application Type',
    addedDate: 'Initiation Date',
    submittedDate: 'Submission Date',
    permitType: 'Permit Type',
    stateName: 'State',
    location: 'Location / Address',
  };

  constructor(
    private adminService: AdminService,
    private applicationService: ApplyService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private progressBar: ProgressBarService,
    private spinner: SpinnerService,
    public cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.categories$.subscribe((data) => {
      this.categories = [...data];
      this.applications$.subscribe((app) => {
        this.applications = app;
      });
    });
  }

  ngOnInit(): void {
    // this.progressBar.open();
    this.spinner.open();

    forkJoin([
      this.applicationService.getApplicationsOnMyDesk(),
      this.adminService.getModule(),
      this.adminService.getAllStaff(),
      this.adminService.getElpsStaffList(),
      this.adminService.getRoles(),
      this.adminService.getOffices(),
      this.adminService.getBranches(),
    ]).subscribe({
      next: (res) => {
        if (res[0].success) {
          this.applications = res[0].data.data;
          this.applications$.next(this.applications);
        }

        if (res[1].success) {
          this.categories = res[1].data.data;
          this.categories$.next(res[1].data.data);
        }

        if (res[2].success) this.users = res[2].data.data;

        if (res[3].success) this.staffList = res[3].data.data;

        if (res[4].success) this.roles = res[4].data.data;

        if (res[5].success) this.offices = res[5].data.data;

        if (res[6].success) this.branches = res[6].data.data;

        // this.progressBar.close();
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

        // this.progressBar.close();
        this.spinner.close();
      },
    });
  }

  ngAfterViewInit(): void {
    // this.categories = [...this.categories];
  }

  // onViewData(event: Event, type: string) {
  //   const operationConfiguration = {
  //     applications: {
  //       data: {
  //         application: event,
  //       },
  //       view: ViewApplicationComponent,
  //     },
  //   };

  //   let dialogRef = this.dialog.open(operationConfiguration[type].view, {
  //     data: {
  //       data: operationConfiguration[type].data,
  //     },
  //     minHeight: '99vh',
  //     minWidth: '94vw',
  //   });

  //   dialogRef.afterClosed().subscribe((res) => {
  //     //The need to Refetch data not apparent at the moment
  //   });
  // }

  onViewData(event: any, type: string) {
    this.router.navigate([`/admin/view-application/${event.id}`], {
      queryParams: { id: event.id, appSource: AppSource.MyDesk },
    });
  }

  onAssignApplication() {
    const operationConfiguration = {
      users: {
        data: {
          applications: this.applications,
          staffs: this.users,
          roles: this.roles,
          offices: this.offices,
          branches: this.branches,
        },
        form: AssignApplicationFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration['users'].form, {
      data: {
        data: operationConfiguration['users'].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.progressBar.open();

      this.adminService.getAllStaff().subscribe((res) => {
        this.users = res.data.data;

        this.progressBar.close();
      });
    });
  }
}
