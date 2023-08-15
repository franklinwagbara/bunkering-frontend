import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ViewApplicationComponent } from 'src/app/admin/application/view-application/view-application.component';
import { AuthenticationService, GenericService } from 'src/app/shared/services';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { environment } from 'src/environments/environment';
import { PaymentSummary } from '../paymnet-summary/paymentsum.component';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { AppSource } from 'src/app/shared/constants/appSource';

@Component({
  templateUrl: 'myapplication.component.html',
  styleUrls: ['./myapplication.component.scss'],
})
export class MyApplicationComponent implements OnInit {
  genk: GenericService;
  application_id: number = null;
  paymentSummary: PaymentSummary;
  public rrr$ = new Subject<string>();
  public applicationStatus$ = new Subject<string>();
  private rrr: string;
  public applications$ = new Subject<Application[]>();

  applications: Application[];

  tableTitles = {
    app: 'My Applications',
  };

  applicationTableKeysMappedToHeaders = {
    appReference: 'Ap. pReference',
    companyName: 'Company Name',
    permitType: 'Permit Type',
    facilityAddress: 'Address/Location',
    submittedDate: 'Date Submitted',
    status: 'Status',
  };

  /**
   *
   */

  constructor(
    private gen: GenericService,
    private router: Router,
    public dialog: MatDialog,
    private progressbar: ProgressBarService,
    private applicationServer: ApplyService,
    private snackBar: MatSnackBar,
    private applicationService: ApplicationService,
    private cd: ChangeDetectorRef
  ) {
    this.genk = gen;
    this.rrr$.subscribe((data) => {
      this.rrr = data;
    });
  }

  ngOnInit(): void {
    this.getCompanyApplication();
  }

  getCompanyApplication() {
    this.progressbar.open();
    this.applicationService.getApplicationsOnDesk().subscribe({
      next: (res) => {
        if (res.success) {
          this.applications = res.data;
          this.applications$.next(res.data);

          //todo: display success dialog
          this.progressbar.close();
          this.cd.markForCheck();
        }
      },
      error: (error) => {
        //todo: display error dialog
        this.progressbar.close();
        this.cd.markForCheck();
      },
    });
  }

  generateRRR(app: Application) {
    this.progressbar.open();
    this.applicationServer.createPayment_RRR(app.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.rrr$.next(res.data.rrr);

          this.router.navigate(['/company/paymentsum/' + app.id]);

          this.snackBar.open('RRR was generated successfully!', null, {
            panelClass: ['success'],
          });

          //todo: display success dialog
          this.progressbar.close();
          this.cd.markForCheck();
        }
      },
      error: (error) => {
        this.snackBar.open('RRR generation failed!', null, {
          panelClass: ['error'],
        });

        //todo: display error dialog
        this.progressbar.close();
        this.cd.markForCheck();
      },
    });
  }

  confirmPayment(app: Application) {
    this.progressbar.open();

    this.applicationServer.confirmPayment(app.id).subscribe({
      next: (res) => {
        this.router.navigate(['/company/paymentsum/' + app.id]);
        this.progressbar.close();
      },
      error: (error) => {
        this.snackBar.open(
          'Payment confirmation not successfull. Please contact support or proceed to pay online.',
          null,
          {
            panelClass: ['error'],
          }
        );
        this.router.navigate(['/company/paymentsum/' + app.id]);
        this.progressbar.close();
      },
    });
  }

  uploadDocument(app: Application) {
    this.router.navigate([`/company/upload-document/${app.id}`]);
  }

  // viewApplication(event: Event, type: string) {
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

  viewApplication(event: any, type: string) {
    this.router.navigate([`/company/view-application/${event.appId}`], {
      queryParams: { id: event.appId, appSource: AppSource.Application },
    });
  }
}

export interface Application {
  addedDate: string;
  appHistory: any[];
  appReference: string;
  appType: string;
  applicationforms: any[];
  category: string;
  companyAddress: string;
  companyEmail: string;
  companyName: string;
  currentDesk: string;
  extraPayments: any[];
  facilityAddress: string;
  facilityName: string;
  gpsCordinates: string;
  id: string;
  inspectionForm: any[];
  permitType: string;
  rrr: string;
  schedules: any[];
  stage: string;
  stateName: string;
  status: string;
  submittedDate: string;
}
