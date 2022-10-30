import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private currentUserSubject: BehaviorSubject<LoginModel>;
  public currentUser: Observable<LoginModel>;
  private num = 2;
  public code = '6x0x5x1x';
  public isLoggedIn = false;

  constructor(private http: HttpClient) {
    // if(localStorage.getItem('currentUser') != null){
    //     this.currentUserSubject = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('currentUser')));
    //     this.currentUser = this.currentUserSubject.asObservable();
    // }
    this.currentUserSubject = new BehaviorSubject<LoginModel>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel {
    return this.currentUserSubject.value;
  }

  login(email: string, code: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/login`, '', {
        params: { email: email, code: code },
      })
      .pipe(
        retry(this.num),
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          //localStorage.setItem('iden', user.id);
          this.currentUserSubject.next(user.data);
          this.isLoggedIn = true;
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    //localStorage.removeItem('iden');
    this.currentUserSubject.next(null);
    this.isLoggedIn = false;
  }

  createStaff(model) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/add-staff`, model)
      .pipe(retry(this.num));
  }

  getStaffDashboard() {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/staff-dashboard`, {})
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getStaffDesk() {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/get-staff-desk`, {})
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getAllStaff() {
    return this.http
      .get<any>(`${environment.apiUrl}/account/all-staff`, {})
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  deleteStaff(id: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/account/deactivate-staff?id=${id}`)
      .pipe(retry(this.num));
  }

  getElpsStaffList() {
    return this.http
      .get<any>(`${environment.apiUrl}/account/all-elps-staff`, {})
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getRoles() {
    return this.http
      .get<any>(`${environment.apiUrl}/account/all-staff-roles`, {})
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getCompanyResource(companyCode: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/account/getCompanyResource`, {
        params: { companyCode: companyCode },
      })
      .pipe(retry(this.num));
  }

  addStaff(model: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/account/add-staff`, model)
      .pipe(retry(this.num));
  }

  getPhaseCategories() {
    return this.http
      .get<any>(`${environment.apiUrl}/configuration/get-permit-configuration`)
      .pipe(retry(this.num));
  }

  createModule(model: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/configuration/post-module-configuration`,
        model
      )
      .pipe(retry(this.num));
  }

  deleteModule(moduleId: number) {
    return this.http
      .delete<any>(
        `${environment.apiUrl}/configuration/delete-module-configuration?id=${moduleId}`
      )
      .pipe(retry(this.num));
  }

  editModule(model) {
    return this.http
      .put<any>(
        `${environment.apiUrl}/configuration/update-module-configuration`,
        model
      )
      .pipe(retry(this.num));
  }

  createPhase(model: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/configuration/post-permit-configuration`,
        model
      )
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  editPhase(model: any) {
    return this.http
      .put<any>(
        `${environment.apiUrl}/configuration/update-permit-configuration`,
        model
      )
      .pipe(retry(this.num));
  }

  deletePhase(id: number) {
    return this.http
      .delete<any>(
        `${environment.apiUrl}/configuration/delete-permit-configuration`,
        {
          params: { permitID: id },
        }
      )
      .pipe(retry(this.num));
  }

  createPermitStage(model: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/configuration/post-permit-stage`, model)
      .pipe(
        retry(this.num),
        map((res) => res)
      );
  }

  editPermitStage(model: any) {
    return this.http
      .put<any>(
        `${environment.apiUrl}/configuration/update-permit-stage`,
        model
      )
      .pipe(retry(this.num));
  }

  deletePermitStage(id: number) {
    return this.http
      .delete<any>(
        `${environment.apiUrl}/configuration/delete-permit-stage?id=${id}`
      )
      .pipe(retry(this.num));
  }

  createStageDocs(model: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/configuration/post-permit-stage-docs`,
        model
      )
      .pipe(retry(this.num));
  }

  getAllDocs() {
    return this.http
      .get<any>(`${environment.apiUrl}/configuration/get-all-docs`)
      .pipe(retry(this.num));
  }

  getAllPermitStageDocs() {
    return this.http
      .get<any>(`${environment.apiUrl}/configuration/get-permit-stage-docs`)
      .pipe(retry(this.num));
  }

  deletePermitStageDocs(id: number) {
    return this.http
      .delete(
        `${environment.apiUrl}/configuration/delete-permit-stage-doc-by-id?id=${id}`
      )
      .pipe(retry(this.num));
  }

  getAppTypes() {
    return this.http
      .get<any>(
        `${environment.apiUrl}/configuration/app type route not defined yet`
      )
      .pipe(retry(this.num));
  }

  getOffices() {
    return this.http
      .get<any>(`${environment.apiUrl}/configuration/field-offices`)
      .pipe(retry(this.num));
  }

  createOffice(model) {
    return this.http
      .post<any>(`${environment.apiUrl}/configuration/add-field-office`, model)
      .pipe(retry(this.num));
  }

  deleteOffice(id: number) {
    return this.http
      .delete<any>(
        `${environment.apiUrl}/configuration/delete-field-office?id=${id}`
      )
      .pipe(retry(this.num));
  }

  addFieldOffice(model: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/configuration/add-field-office`, model)
      .pipe(retry(this.num));
  }

  getBranches() {
    return this.http
      .get<any>(`${environment.apiUrl}/configuration/branches`)
      .pipe(retry(this.num));
  }

  createBranch(model) {
    return this.http
      .post<any>(`${environment.apiUrl}/configuration/add-branch`, model)
      .pipe(retry(this.num));
  }

  deleteBranch(id: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/configuration/delete-branch?id=${id}`)
      .pipe(retry(this.num));
  }

  getApps() {
    return this.http
      .get<any>(`${environment.apiUrl}/admin/all-applications`)
      .pipe(retry(this.num));
  }
}
