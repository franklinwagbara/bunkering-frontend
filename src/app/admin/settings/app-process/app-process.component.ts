import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { IApplicationProcess } from 'src/app/shared/interfaces/IApplicationProcess';
import { IBranch } from 'src/app/shared/interfaces/IBranch';
import { IRole } from 'src/app/shared/interfaces/IRole';
import { ApplicationProcessFormComponent } from 'src/app/shared/reusable-components/application-process-form/application-process-form.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { PermitStage } from '../modules-setting/modules-setting.component';

@Component({
  selector: 'app-app-process',
  templateUrl: './app-process.component.html',
  styleUrls: ['./app-process.component.css'],
})
export class AppProcessComponent implements OnInit {
  public applicationProcesses: IApplicationProcess[];
  public permitStages: PermitStage[];
  public branches: IBranch[];
  public roles: IRole[];
  public actions: string[];
  public statuses: string[];

  public tableTitles = {
    branches: 'APPLICATION PROCESS',
  };

  public branchKeysMappedToHeaders = {
    permitStageName: 'Permit Stage',
    branchName: 'Branch',
    office: 'Office',
    triggeredByRole: 'Triggered By',
    action: 'Action',
    targetRole: 'Target Role',
    status: 'Application Status',
    rate: 'State',
  };

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private progressBarService: ProgressBarService,
    private adminHttpService: AdminService
  ) {}

  ngOnInit(): void {
    this.progressBarService.open();

    forkJoin([
      this.adminHttpService.getApplicationProcesses(),
      this.adminHttpService.getBranches(),
      this.adminHttpService.getRoles(),
      this.adminHttpService.getActionsAndStatuses(),
      this.adminHttpService.getPhaseCategories(),
    ]).subscribe({
      next: (res) => {
        if (res[0].success) this.applicationProcesses = res[0].data.data;

        if (res[1].success) this.branches = res[1].data.data;

        if (res[2].success) this.roles = res[2].data.data;

        if (res[3].success) {
          this.actions = res[3].data.data.actions;
          this.statuses = res[3].data.data.status;
        }

        if (res[4].success) this.permitStages = res[4].data.data.permitStages;

        this.progressBarService.close();
      },

      error: (error) => {
        this.snackBar.open(
          'Something went wrong while retrieving data.',
          null,
          {
            panelClass: ['error'],
          }
        );

        this.progressBarService.close();
      },
    });
  }

  onAddData(event: Event, type: string) {
    const operationConfiguration = {
      applicationProcesses: {
        data: {
          permitStages: this.permitStages,
          branches: this.branches,
          roles: this.roles,
          actions: this.actions,
          statuses: this.statuses,
        },
        form: ApplicationProcessFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration[type].form, {
      data: {
        data: operationConfiguration[type].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.progressBarService.open();

      this.adminHttpService.getApplicationProcesses().subscribe((res) => {
        this.applicationProcesses = res.data.data;

        this.progressBarService.close();
      });
    });
  }

  onDeleteData(event: any, type: string) {
    const typeToModelMapper = {
      applicationProcesses: {
        name: 'Application Process',
        id: 'id',
      },
    };

    const listOfDataToDelete = [...event];

    const requests = (listOfDataToDelete as any[]).map((req) => {
      if (type === 'applicationProcesses') {
        return this.adminHttpService.deleteApplicationProcess(
          req[typeToModelMapper[type].id]
        );
      } else {
        return this.adminHttpService.deleteApplicationProcess(
          req[typeToModelMapper[type].id]
        );
      }
    });

    this.progressBarService.open();

    forkJoin(requests).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open(
            `${typeToModelMapper.applicationProcesses.name} was deleted successfully!`,
            null,
            {
              panelClass: ['success'],
            }
          );

          const responses = res
            .map((r) => r.data.data)
            .sort((a, b) => a.length - b.length);

          if (type === 'branches') this.applicationProcesses = responses[0];
        }

        this.progressBarService.close();
      },

      error: (error) => {
        this.snackBar.open('Something went wrong while deleting data!', null, {
          panelClass: ['error'],
        });

        this.progressBarService.close();
      },
    });
  }

  onEditData(event: any, type: string) {
    console.log('Edit not implemented yet');
  }
}
