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

    getLgaByStateId(id: number){
        return this.http.get<any>(`${environment.apiUrl}/application/lga-list-by-Id`, {params: {id }})
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
        return this.http.post<any>(`${environment.apiUrl}/application/application-form`, conbody)
          .pipe(retry(this.num),
            map((response) => {
              return response
            })
          )
      }
    


      postsavecontinue(data: any,state: string, category: string, lga, phase:string, address: string, uploadFile:string,){

        return this.http.post<any>(`${environment.apiUrl}/application/postsavecontinue`, data, {params: {state: state, category: category, lga: lga, phase:phase, address: address, uploadFile: uploadFile}})
        .pipe(retry(this.num),
        map((response) => {
          return response
        })
        )
      }
   

    getappdetailsbyId(id: number){
<<<<<<< HEAD
        debugger;
        
=======
>>>>>>> 07ba5cc74efc42fcf2890a896c0cf5da14f546e5
        return this.http.get<any>(`${environment.apiUrl}/application/get-app-details-by-id`, {params: {id }})
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }


    
}
