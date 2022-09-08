import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
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
        this.currentUserSubject = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoginModel {
        return this.currentUserSubject.value;
    }


    login(email: string, code: string) {
        return this.http.post<any>(`${environment.apiUrl}/account/login`, '', {params: { email: email, code: code}})
            .pipe(retry(this.num), map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                    //localStorage.setItem('iden', user.id);
                    this.currentUserSubject.next(user.data);
                    this.isLoggedIn = true;
                    return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //localStorage.removeItem('iden');
        this.currentUserSubject.next(null);
        this.isLoggedIn = false;
    }

    getStaffDashboard(){
        return this.http.get<any>(`${environment.apiUrl}/admin/staff-dashboard`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getStaffDesk(){
        return this.http.get<any>(`${environment.apiUrl}/admin/get-staff-desk`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getAllStaff(){
        return this.http.get<any>(`${environment.apiUrl}/account/all-staff`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getElpsStaffList(){
        return this.http.get<any>(`${environment.apiUrl}/account/all-elps-staff`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }
    
    getRoles(){
        return this.http.get<any>(`${environment.apiUrl}/account/all-staff-roles`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getCompanyResource(companyCode: string) {
        return this.http.get<any>(`${environment.apiUrl}/account/getCompanyResource`, {params: {companyCode: companyCode}})
            .pipe(retry(this.num));
    }

    addStaff(model: any){
        return this.http.post<any>(`${environment.apiUrl}/account/add-staff`, model)
            .pipe(retry(this.num));
    }
}
