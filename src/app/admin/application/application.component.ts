import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  applications: any;

  constructor(private auth: AdminService) { }

  ngOnInit(): void {
    this.auth.getApps().subscribe((data) => {
      this.applications = data.data.data;
   });
  }

}
