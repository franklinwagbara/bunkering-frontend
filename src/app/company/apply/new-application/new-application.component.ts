import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { LibaryService } from 'src/app/shared/services/libary.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css', '../apply.component.scss'],
})
export class NewApplicationComponent implements OnInit {
  public applicationTypes: IApplicationType[];
  public facilityTypes: IFacilityType[];
  public states: IState[];
  public lga: ILGA[];
  public isLicenceVerified = false;
  public applicationTypeId: number;
  public isLoading: boolean = false;
  public tanks: ITank[];
  public products: IProduct[];
  public selectedTanks: ITankDTO[] = [];

  public faciltyForm: FormGroup;
  public tankForm: FormGroup;

  constructor(
    private libraryService: LibaryService,
    private progress: ProgressBarService,
    private popUp: PopupService,
    private formBuilder: FormBuilder,
    private appService: ApplicationService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.faciltyForm = this.formBuilder.group({
      facilityTypeId: ['', Validators.required],
      // applicationTypeId: ['', Validators.required],
      facilityName: ['', Validators.required],
      address: ['', Validators.required],
      licenseNo: ['', Validators.required],
      stateId: ['', Validators.required],
      lgaId: ['', Validators.required],
    });

    this.tankForm = this.formBuilder.group({
      name: ['', Validators.required],
      productId: ['', Validators.required],
    });

    this.isLoading = true;

    this.licenseNoControl.valueChanges.subscribe((res) => {
      this.isLoading = true;
      this.cd.markForCheck();
    });

    this.licenseNoControl.valueChanges
      .pipe(
        switchMap((res) =>
          this.appService.verifyLicence(res).pipe(
            catchError((error) => {
              return of(null);
            })
          )
        )
      )
      .subscribe({
        next: (res) => {
          if (res == null) {
            this.isLicenceVerified = false;
            this.isLoading = false;
          } else {
            this.isLicenceVerified = true;
            this.tanks = res.data.tanks;
          }

          this.isLoading = false;
          this.cd.markForCheck();
        },
        error: (error) => {
          this.isLicenceVerified = false;

          this.isLoading = false;
          this.cd.markForCheck();
        },
      });

    this.stateControl.valueChanges.subscribe((value) => {
      this.getLGAByStateId(value);
    });

    this.getFacilityTypes();
    this.getApplicationTypes();
    this.getStates();
    this.getProducts();
  }

  public get stateControl() {
    return this.faciltyForm.controls['stateId'];
  }

  public get licenseNoControl() {
    return this.faciltyForm.controls['licenseNo'];
  }

  public get productIdControl() {
    return this.tankForm.controls['productId'];
  }

  public submit() {
    const payload: IApplicationFormDTO = {
      facilityTypeId: this.faciltyForm.value.facilityTypeId,
      applicationTypeId: this.applicationTypeId,
      facilityName: this.faciltyForm.value.facilityName,
      address: this.faciltyForm.value.address,
      licenseNo: this.faciltyForm.value.licenseNo,
      stateId: this.faciltyForm.value.stateId,
      lgaId: this.faciltyForm.value.lgaId,
      appTanks: this.selectedTanks,
    };

    this.progress.open();
    this.appService.apply(payload).subscribe({
      next: (res) => {
        const appId = res.data.appId;
        this.progress.close();
        this.cd.markForCheck();

        this.router.navigate(['paymentsum', appId]);
      },
      error: (error) => {
        this.popUp.open(error.message, 'error');
        this.progress.close();
      },
    });
  }

  public addTank() {
    const formValue = this.tankForm.value;
    const newTank: ITankDTO = {
      applicationId: '0',
      tankId: 0,
      facilityId: this.faciltyForm.value.facilityTypeId,
      name: formValue.name,
      capacity: this.tanks.find((x) => x.name == formValue.name).capacity,
      productId: formValue.productId,
      product: this.products.find((x) => x.id == formValue.productId).name,
    };

    const isExist = this.selectedTanks.find((x) => x.name == newTank.name);

    if (!isExist) this.selectedTanks.push(newTank);
    else this.popUp.open('This tank has been added before!', 'error');
    this.cd.markForCheck();
  }

  public removeTank(tank: ITankDTO) {
    this.selectedTanks = this.selectedTanks.filter((x) => x.name !== tank.name);
    this.cd.markForCheck();
  }

  public getFacilityTypes() {
    this.progress.open();

    this.libraryService.getFacilityTypes().subscribe({
      next: (res) => {
        this.facilityTypes = res.data;
        this.progress.close();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.popUp.open(error.message, 'error');
        this.progress.close();
      },
    });
  }

  public getApplicationTypes() {
    this.progress.open();

    this.libraryService.getApplicationTypes().subscribe({
      next: (res) => {
        this.applicationTypes = res.data;
        this.applicationTypeId = this.applicationTypes.find(
          (x) => x.name.toLowerCase() == 'new'
        ).id;
        this.progress.close();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.popUp.open(error.message, 'error');
        this.progress.close();
      },
    });
  }

  public getProducts() {
    this.progress.open();
    this.libraryService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.progress.close();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.popUp.open(error.message, 'error');
        this.progress.close();
      },
    });
  }

  public getStates() {
    this.progress.open();

    this.libraryService.getStates().subscribe({
      next: (res) => {
        this.states = res.data;
        this.progress.close();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.popUp.open(error.message, 'error');
        this.progress.close();
      },
    });
  }

  public getLGAByStateId(id: number) {
    this.progress.open();

    this.libraryService.getLGAByStateId(id).subscribe({
      next: (res) => {
        this.lga = res.data;
        this.progress.close();
        this.cd.markForCheck();
      },
      error: (error) => {
        this.popUp.open(error.message, 'error');
        this.progress.close();
      },
    });
  }
}

export interface IFacilityType {
  id: number;
  name: string;
  code: string;
}

export interface IState {
  id: number;
  name: string;
  countryID: number;
  countryName: string;
  code: string;
}

export interface ILGA {
  id: number;
  name: string;
  stateId: number;
}
export interface ITank {
  id: number;
  name: string;
  capacity: string;
  product: string;
}

export interface ITankDTO {
  name: string;
  tankId: number;
  capacity: string;
  applicationId?: string;
  facilityId: number;
  productId: number;
  product: string;
}

export interface IProduct {
  id: number;
  name: string;
}

export interface IApplicationType {
  id: number;
  name: string;
}

export interface IApplicationFormDTO {
  facilityTypeId: number;
  applicationTypeId: number;
  facilityName: string;
  address: string;
  licenseNo: string;
  stateId: number;
  lgaId: number;
  appTanks: ITankDTO[];
}
