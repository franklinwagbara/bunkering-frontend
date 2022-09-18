import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';

@Injectable({ providedIn: 'root' })
export class ApplyService {
    private num = 2;


    constructor(private http: HttpClient) {
        
    }


    
   
    getApplicationCategory(){
        return this.http.get<any>(`${environment.apiUrl}/application/application-category`, {})
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
   

    
}
