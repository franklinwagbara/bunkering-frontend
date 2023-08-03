import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/application`;
@Injectable({ providedIn: 'root' })
export class CompanyService {
  private num = 2;

  constructor(private http: HttpClient) {}

  public getUploadDocuments(appId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/application/document-upload`,
      {
        params: { id: appId },
      }
    );
  }

  public getCompanyDashboard() {
    return this.http.get<any>(`${API}/dashboard`);
  }
}
