import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/company`;
@Injectable({ providedIn: 'root' })
export class CompanyService {
  private num = 2;

  constructor(private http: HttpClient) {}

  public getCompanyDashboard() {
    return this.http.get<any>(`${API}/dashboard`);
  }

  public getCompanyMessages() {
    return this.http.get<any>(`${API}/get-all-message`);
  }
}
