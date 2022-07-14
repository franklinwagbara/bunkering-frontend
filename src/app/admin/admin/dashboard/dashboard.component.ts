import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService, AuthenticationService } from 'src/app/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  model: DashBoardModel;
  // displapAppFiveDays = true;


  constructor(public generic: GenericService, private auth: AuthenticationService, private router: Router) {
    this.auth.getStaffDashboard()
      .subscribe(result => {
        if(result.success){
          // var response = JSON.parse(result.data);
          // this.model = response.data.map();
          this.model = new DashBoardModel(result.data.data)
        }

      });
   }

  ngOnInit(): void {
    // this.auth.getStaffDashboard()
    //   .subscribe(result => {
    //     if(result.success){
    //       var response = JSON.parse(result.data);
    //       this.model = new DashBoardModel(response.data)
    //     }

    //   });
  }

  logout(): void{
    this.auth.logout();
    // this.router.navigate([]);
    window.location.href = environment.apiUrl + '/auth/log-out';
  }

}

class DashBoardModel{
  deskCount: number;
  approvedCount: number;
  rejectedCount: number;
  processingCount: number;
  onStaffDeskForFiveDays: [];
  inProcessingForThreeWeeks: []

  constructor(obj: any){
    this.deskCount = obj.deskCount;
    this.approvedCount = obj.approvedCount;
    this.rejectedCount = obj.rejectedCount;
    this.processingCount = obj.processingCount;
    this.onStaffDeskForFiveDays = obj.onStaffDeskForFiveDays;
    this.inProcessingForThreeWeeks = obj.inProcessingForThreeWeeks;
  }
}
