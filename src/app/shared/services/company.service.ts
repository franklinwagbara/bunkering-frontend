import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { retry, map } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root'})
export class CompanySErvice{
    private num = 2;
    /**
     *
     */
    constructor(private http: HttpClient) {
            
    }

    getCompanyApplications(){
        return this.http.get<any>(`${environment.apiUrl}/company/my-apps`)
            .pipe(retry(this.num), map(res => {
                return res;
            }));
    }
}