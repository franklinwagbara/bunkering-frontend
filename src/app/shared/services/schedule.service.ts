import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../reusable-components/add-schedule-form copy/add-schedule-form.component';

const API = `${environment.apiUrl}/schedules`;

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  addSchedule(model: Schedule) {
    return this.http.post<any>(`${API}/add-schedule`, model);
  }
}
