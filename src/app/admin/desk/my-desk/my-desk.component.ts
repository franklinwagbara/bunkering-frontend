import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { ViewApplicationComponent } from '../../application/view-application/view-application.component';
import { Category } from '../../settings/modules-setting/modules-setting.component';

@Component({
  selector: 'app-my-desk',
  templateUrl: './my-desk.component.html',
  styleUrls: ['./my-desk.component.css'],
})
export class MyDeskComponent implements OnInit {
  public applications: IApplication[];
  public categories: Category[];

  public tableTitles = {
    applications: 'All Applications',
  };

  addDate: Date;
  applicationType: string;
  applicationforms: IApplicationForm[];
  categoryCode: string;
  categoryId: string;
  companyName: string;
  currentUser: string;
  id: number;
  lgaId: number;
  location: string;
  phaseName: string;
  phaseStageId: number;
  reference: string;
  stateId: number;
  status: boolean;

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
    private progressBar: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.progressBar.open();
    forkJoin([
      this.applicationService.getApplicationsOnMyDesk(),
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
    console.log('cateegor', this.categories);
  }

  onViewData(event: Event, type: string) {
    const operationConfiguration = {
      applications: {
        data: {
          application: event,
        },
        view: ViewApplicationComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration[type].view, {
      data: {
        data: operationConfiguration[type].data,
      },
      minHeight: '99vh',
      minWidth: '94vw',
    });

    dialogRef.afterClosed().subscribe((res) => {
      //The need to Refetch data not apparent at the moment
    });
  }

  getApplicationByCategoryId(name: string): IApplication[] | null {
    const filteredByCategoryId = this.applications.filter(
      (app) => app.category === name
    );

    return filteredByCategoryId.length === 0
      ? this.applications
      : filteredByCategoryId;
  }
}

export interface IAppReference {}

export interface IExtraPayment {}

export interface IInspectionForm {}

export interface ISchedule {}

export interface IApplication {
  id: number;
  addedDate: Date;
  appHistory: IAppReference[];
  appReference: string;
  appType: string;
  applicationforms: IApplicationForm[];
  category: string;
  categoryCode: string;
  categoryId: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  currentDesk: string;
  currentUser: string;
  extraPayments: IExtraPayment[];
  facilityAddress: string;
  facilityName: string;
  gpsCordinates: string;
  inspectionForm: IInspectionForm[];
  permitType: string;
  rrr: string;
  schedules: ISchedule[];
  submittedDate: string;
  lgaId: number;
  location: string;
  phaseName: string;
  phaseStageId: number;
  stateId: number;
  status: boolean;
}

export interface IApplicationForm {
  afe: string;
  block: string;
  cumulativeProductionForWell: number;
  estimatedOperationsDays: number;
  expectedVolumes: number;
  field: string;
  initialReservesAllocationOfWell: number;
  landSize: number;
  lastProductionRate: number;
  natureOfOperation: string;
  plugBackInterval: number;
  postOperationProductionRate: number;
  proposedRig: string;
  rigForOperations: string;
  spudDate: Date;
  targetReserves: string;
  terrain: string;
  wellClassApplied: string;
  wellCompletionInterval: number;
  wellLocationCategory: string;
  wellName: string;
  wellPreSpudName: string;
  wellSpudName: string;
  wellSurfaceCoordinates: string;
}
