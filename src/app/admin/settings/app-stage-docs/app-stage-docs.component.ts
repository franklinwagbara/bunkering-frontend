import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { PermitStageDocFormComponent } from 'src/app/shared/reusable-components/permit-stage-doc-form/permit-stage-doc-form.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import {
  Category,
  PermitStage,
  Phase,
} from '../modules-setting/modules-setting.component';

@Component({
  selector: 'app-app-stage-docs',
  templateUrl: './app-stage-docs.component.html',
  styleUrls: ['./app-stage-docs.component.css'],
})
export class AppStageDocsComponent implements OnInit {
  form: FormGroup;
  permitStageDocuments: PermitStageDocument[];
  categories: Category[];
  phases: Phase[];
  permitStages: PermitStage[];
  docs: Doc[];
  appTypes: AppType[];

  tableTitles = {
    permitStageDocuments: 'PERMIT STAGE DOCUMENTS SETTINGS',
  };

  permitStageDocsKeysMappedToHeaders = {
    docId: 'Document ID',
    appTypeId: 'Application Type ID',
    appType: 'Application Type',
    phaseStageId: 'Phase Stage ID',
    phaseStage: 'Phase Stage',
    docName: 'Document Name',
    docType: 'Document type',
    isMandatory: 'Mandatory',
    status: 'Status',
    sortId: 'Sort Id',
  };

  constructor(
    private adminHttpService: AdminService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public progressBarService: ProgressBarService
  ) {
    this.form = this.formBuilder.group({
      phaseStageId: ['', Validators.required],
      appTypeId: ['', Validators.required],
      docId: ['', Validators.required],
      docType: ['', Validators.required],
      isMandatory: ['', Validators.required],

      sortId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.progressBarService.open();

    forkJoin([
      this.adminHttpService.getPhaseCategories(),
      this.adminHttpService.getAllPermitStageDocs(),
      this.adminHttpService.getAllDocs(),
      // this.adminHttpService.getAppTypes(),
    ]).subscribe({
      next: (res) => {
        if (res[0].success) {
          this.categories = res[0].data.data.allModules;
          this.phases = res[0].data.data.allPermits;

          this.permitStages = res[0].data.data.permitStages;
        }

        if (res[1].success) this.permitStageDocuments = res[1].data.data;

        if (res[2].success) this.docs = res[2].data.data;

        // if (res[3].success) this.appTypes = res[3].data.data;

        this.progressBarService.close();
      },
      error: (error) => {
        this.snackBar.open('Something went wrong while retrieve data!', null, {
          panelClass: ['error'],
        });
        this.progressBarService.close();
      },
    });
  }

  onAddData(event: Event, type: string) {
    const operationsConfiguration = {
      permitStageDoc: {
        data: {
          categories: this.categories,
          phases: this.phases,
          permitStages: this.permitStages,
          docs: this.docs,
          appType: this.appTypes,
        },
        form: PermitStageDocFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationsConfiguration[type].form, {
      data: {
        data: operationsConfiguration[type].data,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.progressBarService.open();

      forkJoin([
        this.adminHttpService.getPhaseCategories(),
        this.adminHttpService.getAllPermitStageDocs(),
        this.adminHttpService.getAllDocs(),
        // this.adminHttpService.getAppTypes(),
      ]).subscribe({
        next: (res) => {
          if (res[0].success) {
            this.categories = res[0].data.data.allModules;
            this.phases = res[0].data.data.allPermits;
            this.permitStages = res[0].data.permitStages;
          }

          if (res[1].success) {
            this.permitStageDocuments = res[1].data.data;
          }

          if (res[2].success) {
            this.docs = res[2].data.data;
          }

          // if (res[3].success) {
          //   this.appTypes = res[3].data.data;
          // }

          this.progressBarService.close();
        },
        error: (error) => {
          this.snackBar.open(
            'Something went wrong while retrieve data!',
            null,
            {
              panelClass: ['error'],
            }
          );
          this.progressBarService.close();
        },
      });
    });
  }

  onDeleteData(event: any, type: string) {
    const typeToModelMapper = {
      permitStageDocument: {
        name: 'PermitStageDocument',
        id: 'id',
      },
    };

    const listOfDataToDelete = [...event];

    const requests = (listOfDataToDelete as any[]).map((req) => {
      if (type === 'permitStageDocument')
        return this.adminHttpService.deletePermitStageDocs(
          req[typeToModelMapper[type].id]
        );
      else
        return this.adminHttpService.deletePermitStageDocs(
          req[typeToModelMapper[type].id]
        );
    });

    this.progressBarService.open();
    forkJoin(requests).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open(
            `${typeToModelMapper.permitStageDocument.name} was deleted successfully.`,
            null,
            {
              panelClass: ['success'],
            }
          );

          const responses = res
            .map((r: any) => r.data.data)
            .sort((a, b) => a.length - b.length);

          if (type === 'permitStageDocument')
            this.permitStageDocuments = responses[0];
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

  onEditData(event: Event, type: string) {}
}

export interface PermitStageDocument {
  id?: number;
  docId: number;
  docType: string;
  isMandatory: boolean;
  status: boolean;
  sortId: number;
  phaseStageId?: number;
  phaseStage?: string;
  appTypeId?: number;
  appType?: string;
}

export interface Doc {
  id: number;
  name: string;
  type: string;
}

export interface AppType {
  id: number;
  name: string;
}
