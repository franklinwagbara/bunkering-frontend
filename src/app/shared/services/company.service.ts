import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private num = 2;
  /**
   *
   */
  constructor(private http: HttpClient) {}

  getCompanyApplications() {
    return this.http.get<any>(`${environment.apiUrl}/company/my-apps`).pipe();
  }

  getUploadDocuments(appId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/application/document-upload`,
      {
        params: { id: appId },
      }
    );
  }
}
