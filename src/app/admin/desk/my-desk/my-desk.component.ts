import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { AppSource } from 'src/app/shared/constants/appSource';
import { IApplication } from 'src/app/shared/interfaces/IApplication';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
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
    this.progressBar.open();
    forkJoin([
      this.applicationService.getApplicationsOnMyDesk(),
      this.adminService.getModule(),
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

        this.cd.markForCheck();
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
}
