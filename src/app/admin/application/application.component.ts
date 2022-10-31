import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { ViewApplicationComponent } from './view-application/view-application.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit {
  public applications: IApplication[];

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
    reference: 'Reference Number',
    companyName: 'Company Name',
    applicationType: 'Application Type',
    location: 'Location / Address',
  };

  constructor(
    private adminService: AdminService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private progressBar: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.progressBar.open();
    forkJoin([this.adminService.getApps()]).subscribe({
      next: (res) => {
        if (res[0].success) this.applications = res[0].data.data;

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

  onAddData(event: Event, type: string) {}

  onDeleteData(event: any, type: string) {}

  onEditData(event: Event, type: string) {}

  onViewData(event: Event, type: string) {
    const operationConfiguration = {
      applications: {
        data: event,
        view: ViewApplicationComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration[type].view, {
      data: {
        data: operationConfiguration[type].data,
      },
      minHeight: '95vh',
      minWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((res) => {
      //The need to Refetch data not apparent at the moment
    });
  }
}

export interface IApplication {
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
