import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';

@Injectable({ providedIn: 'root' })
export class ApplyService {
    private num = 2;
  getState: any;


    constructor(private http: HttpClient) {
        
    }


    
   
    getApplicationCategory(){
        return this.http.get<any>(`${environment.apiUrl}/application/application-category`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getApplicationPhases(id: number){
        return this.http.get<any>(`${environment.apiUrl}/application/application-phases-by-categoryId`, {params: {moduleid: id}})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getLgaList() {
        return this.http.get<any>(`${environment.apiUrl}/application/lga-list`)
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }

    getStateList(){
        return this.http.get<any>(`${environment.apiUrl}/application/state-list`)
            .pipe(retry(this.num), map(res => {
                return res;
            }));

    }

    uploadApplyform(conbody: FormData) {
debugger;
        return this.http.post<any>(`${environment.apiUrl}/application/application-form`, conbody)
          .pipe(retry(this.num),
            map((response) => {
              return response
            })
          )
      }
    


    getAllStaff(){
        return this.http.get<any>(`${environment.apiUrl}/account/all-staff`, {})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }
   

    
}
