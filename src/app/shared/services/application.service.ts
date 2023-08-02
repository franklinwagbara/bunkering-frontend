import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = `${environment.apiUrl}/application`;

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  public verifyLicence(licenceNo: string) {
    return this.http.get<any>(`${API}/verify-license`, {
      params: { license: licenceNo },
    });
  }
}
