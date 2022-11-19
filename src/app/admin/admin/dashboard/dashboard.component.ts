import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService, AuthenticationService } from 'src/app/shared/services';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardInfo: DashBoardModel;
  processingForThreeWeeks: IProcessingForThreeWeeks[] = [];
  onStaffDeskForFiveDays: IOnStaffDeskForFiveDays[] = [];
  messages: IMessages[] = [];

  tableTitles = {
    messages: 'Messages',
    processingForThreeWeeks: 'Applications in Process in the Pass Three Weeks',
    onStaffDeskForFiveDays: 'Applcations on My Desk in the Last Five Days',
  };

  messageKeysMappedToHeaders = {};

  processingForThreeWeekKeysMappedToHeaders = {
    id: 'Application ID',
    categoryId: 'Category ID',
    // phaseStage: 'Phase Stage',
    location: 'Location',
    doc: 'Document',
  };

  onStaffDeskForFiveDayMappedToHeaders = {};
  // displapAppFiveDays = true;

  constructor(
    public generic: GenericService,
    private auth: AuthenticationService,
    private router: Router,
    private progressBar: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.progressBar.open();
    this.auth.getStaffDashboard().subscribe((result) => {
      if (result.success) {
        this.dashboardInfo = new DashBoardModel(result.data.data);
        this.processingForThreeWeeks =
          this.dashboardInfo.inProcessingForThreeWeeks;
        this.onStaffDeskForFiveDays = this.dashboardInfo.onStaffDeskForFiveDays;
        console.log(
          'dashboard info',
          this.dashboardInfo,
          this.processingForThreeWeeks,
          this.onStaffDeskForFiveDays
        );
        this.progressBar.close();
      }
    });
  }

  logout(): void {
    this.auth.logout();
    // this.router.navigate([]);
    window.location.href = environment.apiUrl + '/auth/log-out';
  }
}

class DashBoardModel {
  deskCount: number;
  approvedCount: number;
  rejectedCount: number;
  processingCount: number;
  onStaffDeskForFiveDays: [];
  inProcessingForThreeWeeks: [];

  constructor(obj: any) {
    this.deskCount = obj.deskCount;
    this.approvedCount = obj.approvedCount;
    this.rejectedCount = obj.rejectedCount;
    this.processingCount = obj.processingCount;
    this.onStaffDeskForFiveDays = obj.onStaffDeskForFiveDays;
    this.inProcessingForThreeWeeks = obj.inProcessingForThreeWeeks;
  }
}

interface IProcessingForThreeWeeks {
  id: number;
  categoryId: number;
  lgaId: 0;
  location: string;
  phaseStageId: number;
  applicationforms: [];
}

interface IOnStaffDeskForFiveDays {}

interface IMessages {}
