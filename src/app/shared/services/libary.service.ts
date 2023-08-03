import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const api = `${environment.apiUrl}/library`;

@Injectable({
  providedIn: 'root',
})
export class LibaryService {
  constructor(private http: HttpClient) {}

  public getFacilityTypes() {
    return this.http.get<any>(`${api}/facilitytypes`);
  }

  public getLGAByStateId(id: number) {
    return this.http.get<any>(`${api}/LgaByStateId`, {
      params: { id },
    });
  }

  public getLGA() {
    return this.http.get<any>(`${api}/Lga`);
  }

  public getStates() {
    return this.http.get<any>(`${api}/states`);
  }
}
