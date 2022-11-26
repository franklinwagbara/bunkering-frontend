import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ViewApplicationComponent } from 'src/app/admin/application/view-application/view-application.component';
import { AuthenticationService, GenericService } from 'src/app/shared/services';
import { ApplyService } from 'src/app/shared/services/apply.service';
import { CompanySErvice } from 'src/app/shared/services/company.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { environment } from 'src/environments/environment';
import { PaymentSummary } from '../paymnet-summary/paymentsum.component';

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
    facilityAddress: 'Address/Location',
    status: 'Status',
  };

  /**
   *
   */

  constructor(
    private gen: GenericService,
    private router: Router,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private progressbar: ProgressBarService,
    private applicationServer: ApplyService,
    private snackBar: MatSnackBar,
    private _company: CompanySErvice
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
    this._company.getCompanyApplications().subscribe((res) => {
      if (res.success) {
        this.applications = res.data.data.map((app) => app);
        this.applications$.next(res.data.data);
      }
    });
  }

  generateRRR(app: Application) {
    this.progressbar.open();
    this.applicationServer.createPayment_RRR(app.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.rrr$.next(res.data.data);

          this.router.navigate(['/company/paymentsum/' + app.id]);

          //todo: display success dialog
          this.progressbar.close();
        }
      },
      error: (error) => {
        //todo: display error dialog
        this.progressbar.close();
      },
    });
  }

  viewApplication(event: Event, type: string) {
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
