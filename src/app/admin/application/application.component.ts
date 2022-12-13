import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppSource } from 'src/app/shared/constants/appSource';
import { IApplication } from 'src/app/shared/interfaces/IApplication';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { Category } from '../settings/modules-setting/modules-setting.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit, AfterViewInit {
  public applications: IApplication[];
  public categories: Category[];

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.progressBar.open();
    forkJoin([
      this.adminService.getApps(),
      this.adminService.getModule(),
    ]).subscribe({
      next: (res) => {
        if (res[0].success) this.applications = res[0].data.data;

        if (res[1].success) this.categories = res[1].data.data;

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
    this.categories = [...this.categories];
  }

  onViewData(event: any, type: string) {
    this.router.navigate([`/admin/view-application/${event.id}`], {
      queryParams: { id: event.id, appSource: AppSource.Application },
    });
  }
}
