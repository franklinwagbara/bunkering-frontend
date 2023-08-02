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
  public facilityTypes: IFacilityType[];
  public states: IState[];
  public lga: ILGA[];
  public isLicenceVerified = false;
  public applicationType: string;
  public isLoading: boolean = false;
  public tanks: ITank[];
  public products: IProduct[];

  public faciltyForm: FormGroup;
  public tankForm: FormGroup;

  constructor(
    private libraryService: LibaryService,
    private progress: ProgressBarService,
    private popUp: PopupService,
    private formBuilder: FormBuilder,
    private appService: ApplicationService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.faciltyForm = this.formBuilder.group({
      facilityTypeId: ['', Validators.required],
      applicationTypeId: ['', Validators.required],
      facilityName: ['', Validators.required],
      address: ['', Validators.required],
      licenseNo: ['', Validators.required],
      stateId: ['', Validators.required],
      lgaId: ['', Validators.required],
    });

    this.tankForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
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
    this.getStates();
  }

  public get stateControl() {
    return this.faciltyForm.controls['stateId'];
  }

  public get licenseNoControl() {
    return this.faciltyForm.controls['licenseNo'];
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

export interface ILGA {}
export interface ITank {
  id: number;
  name: string;
  capacity: string;
  product: string;
}

export interface IProduct {
  id: number;
  name: string;
}
