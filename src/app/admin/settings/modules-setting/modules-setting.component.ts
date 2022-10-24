import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PhaseFormComponent } from 'src/app/shared/reusable-components/phase-form/phase-form.component';
import { CategoryFormComponent } from 'src/app/shared/reusable-components/category-form/category-form.component';
import { AdminService } from 'src/app/shared/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StageFormComponent } from 'src/app/shared/reusable-components/stage-form/stage-form.component';

@Component({
  selector: 'app-modules-setting',
  templateUrl: './modules-setting.component.html',
  styleUrls: ['./modules-setting.component.css'],
})
export class ModulesSettingComponent implements OnInit {
  tableTitles = {
    categories: 'Categories Table',
    phases: 'Phases Table',
    permitStages: 'Permit Stages Table',
  };
  categories: Category[];
  phases: Phase[];
  permitStages: PermitStage[];
  closeResult: string;
  form: FormGroup;

  categoryTableKeysMappedToHeaders = {
    code: 'Code',
    name: 'Name',
    description: 'Description',
  };

  phasesTableKeysMappedToHeaders = {
    code: 'Code',
    shortName: 'Name',
    categoryName: 'Category',
    description: 'Description',
    fee: 'Fee (₦)',
    serviceCharge: 'Service Charge (₦)',
    status: 'Status',
  };

  permitStagesTableKeysMappedToHeaders = {
    phaseId: 'Phase ID',
    code: 'Code',
    name: 'Name',
    description: 'Description',
    fee: 'Fee (₦)',
    serviceCharge: 'Service Charge (₦)',
    status: 'Status',
    licenseSerial: 'Licence Serial No.',
  };

  constructor(
    public snackBar: MatSnackBar,
    private adminHttpService: AdminService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      ShortName: ['', Validators.required],
      Code: ['', Validators.required],
      Description: ['', Validators.required],
      CategoryId: ['', Validators.required, Validators.pattern(/^\d+$/)],
      Sort: ['', Validators.required],
      Fee: ['', Validators.required],
      ServiceCharge: ['', Validators.required],
    });
  }

  onAddData(event: Event, type: string) {
    const operationConfiguration = {
      category: {
        data: this.categories,
        form: CategoryFormComponent,
      },
      phase: {
        data: {
          categories: this.categories,
          phases: this.phases,
        },
        form: PhaseFormComponent,
      },
      permitStages: {
        data: { permitStages: this.permitStages, phases: this.phases },
        form: StageFormComponent,
      },
    };

    let dialogRef = this.dialog.open(operationConfiguration[type].form, {
      data: {
        data: operationConfiguration[type].data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.adminHttpService.getPhaseCategories().subscribe((result) => {
        this.categories = result.data.data.allModules.map((cat) => cat);
        this.phases = result.data.data.allPermits.map((phase) => phase);
        this.permitStages = result.data.data.permitStages.map((stage) => stage);
      });
    });
  }

  onDeleteData(event: any, type: string) {
    const typeToModelMapper = {
      category: {
        name: 'Category',
        id: 'id',
      },
      phase: {
        name: 'Phase',
        id: 'id',
      },
      permitStage: {
        name: 'Permit stage',
        id: 'id',
      },
    };

    const listOfDataToDelete = [...event];

    console.log('list of data delete', listOfDataToDelete, type);

    const requests = (listOfDataToDelete as any[]).map((req) => {
      if (type === 'category') {
        console.log('type', 'category', req[typeToModelMapper[type].id], req);
        return this.adminHttpService.deleteModule(
          req[typeToModelMapper[type].id]
        );
      } else if (type === 'phase') {
        console.log('type', 'phase');

        return this.adminHttpService.deletePhase(
          req[typeToModelMapper[type].id]
        );
      } else {
        console.log('type', 'phase');

        return this.adminHttpService.deletePermitStage(
          req[typeToModelMapper[type].id]
        );
      }
    });

    forkJoin(requests).subscribe({
      next: (res) => {
        if (res) {
          this.snackBar.open(
            `${typeToModelMapper.category.name} was deleted successfully!`,
            null,
            {
              panelClass: ['success'],
            }
          );

          const responses = res
            .map((r) => r.data.data)
            .sort((a, b) => a.length - b.length);

          if (type === 'category') this.categories = responses[0];
          else if (type === 'phase') this.phases = responses[0];
          else if (type === 'permitStage') this.permitStages = responses[0];

          console.log(
            'in coming',
            responses,
            this.categories,
            this.phases,
            this.permitStages
          );
        }
      },
      error: (error) => {
        this.snackBar.open('Something went wrong while deleting data!', null, {
          panelClass: ['error'],
        });
      },
    });
  }

  onEditData(event: Event, type: string) {
    console.log('on edit', event, type);
  }

  ngOnInit(): void {
    this.adminHttpService.getPhaseCategories().subscribe((result) => {
      if (result.success) {
        this.categories = result.data.data.allModules.map((cat) => cat);
        this.phases = result.data.data.allPermits.map((phase) => phase);
        this.permitStages = result.data.data.permitStages.map((stage) => stage);
      }
    });
  }
}

export class Category {
  moduleId: number;
  name: string;
  code: string;
  description: string;

  constructor(item: any) {
    this.moduleId = item.moduleId;
    this.code = item.code;
    this.name = item.name;
    this.description = item.description;
  }
}

export class Phase {
  id: number;
  categoryId: number;
  shortName: string;
  code: string;
  sort: number;
  categoryName: string;
  description: string;
  status: boolean;
  fee: number;
  serviceCharge: number;

  constructor(item: any) {
    this.id = item.id;
    this.categoryId = item.categoryId;
    this.code = item.code;
    this.shortName = item.shortName;
    this.sort = item.sort;
    this.categoryName = item.categoryName;
    this.description = item.description;
    this.status = item.status;
    this.fee = item.fee;
    this.serviceCharge = item.serviceCharge;
  }
}

export class PermitStage {
  id: number;
  phaseId: number;
  code: string;
  name: string;
  description: string;
  sort: number;
  fee: number;
  serviceCharge: number;
  status: boolean;
  licenseSerial: number;
  phaseName: string;
  phase: Phase;

  constructor(item: PermitStage) {
    this.id = item.id;
    this.phaseId = item.phaseId;
    this.code = item.code;
    this.name = item.name;
    this.description = item.description;
    this.sort = item.sort;
    this.fee = item.fee;
    this.serviceCharge = item.serviceCharge;
    this.status = item.status;
    this.licenseSerial = item.licenseSerial;
    this.phaseName = item.phaseName;
    this.phase = item.phase;
  }
}
