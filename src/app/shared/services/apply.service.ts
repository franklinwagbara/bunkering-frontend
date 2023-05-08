import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login-model';
import { Schedule } from '../reusable-components/add-schedule-form copy/add-schedule-form.component';

@Injectable({ providedIn: 'root' })
export class ApplyService {
  private num = 2;
  getState: any;
  phaseStageId: any;
  phaseShortName: string;

  constructor(private http: HttpClient) {}

  processApplication(model: {
    applicationId: number;
    currentUserId: string;
    action: string;
    delegatedUserId: string;
    comment: string;
  }) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/process-application`,
      model
    );
  }

  getApplicationCategory() {
    return this.http
      .get<any>(`${environment.apiUrl}/application/application-category`, {})
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getApplicationPhases(id: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/application/application-phases-by-categoryId`,
        { params: { moduleid: id } }
      )
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getAllApplicationPhases() {
    return this.http.get<any>(
      `${environment.apiUrl}/application/application-phases`
    );
  }

  getLgaList() {
    return this.http
      .get<any>(`${environment.apiUrl}/application/lga-list`)
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getLgaByStateId(id: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/application/lga-list-by-Id`, {
        params: { id },
      })
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getStateList() {
    return this.http
      .get<any>(`${environment.apiUrl}/application/state-list`)
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  uploadApplyform(conbody: FormData) {
    return this.http
      .post<any>(`${environment.apiUrl}/application/application-form`, conbody)
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  postsavecontinue(
    data: any,
    state: string,
    category: string,
    lga,
    phase: string,
    address: string,
    uploadFile: string
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}/application/postsavecontinue`, data, {
        params: {
          state: state,
          category: category,
          lga: lga,
          phase: phase,
          address: address,
          uploadFile: uploadFile,
        },
      })
      .pipe(
        retry(this.num),
        map((response) => {
          return response;
        })
      );
  }

  getappdetailsbyId(id: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/application/get-app-details-by-id`, {
        params: { id },
      })
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getpermitstages() {
    return this.http
      .get<any>(`${environment.apiUrl}/configuration/get-permit-stages`)
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getpaymentbyappId(appID: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/application/payment-summary`, {
        params: { id: appID },
      })
      .pipe(
        retry(this.num),
        map((res) => {
          return res;
        })
      );
  }

  getApplicationsOnMyDesk() {
    return this.http
      .get<any>(`${environment.apiUrl}/application/applications-on-my-desk`)
      .pipe(retry(this.num));
  }

  viewApplication(id: any) {
    return this.http.get<any>(`${environment.apiUrl}/admin/view-application`, {
      params: { id },
    });
  }

  createPayment_RRR(appID: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/payment/create-payment`,
        {},
        { params: { appID } }
      )
      .pipe();
  }

  confirmPayment(appId: string) {
    return this.http.get<any>(`${environment.apiUrl}/payment/confirm-payment`, {
      params: { id: appId },
    });
  }

  uploadCompanyFileToElps(
    docTypeId,
    compId,
    facilityId,
    email,
    apiHash,
    docName,
    docType,
    uniqueid,
    file,
    action: string
  ) {
    if (!action || (action === 'create' && docType === 'company')) {
      return this.http.post<any>(
        `https://elpsdemo.dpr.gov.ng/api/UploadCompanyDoc/${docTypeId}/${compId}/${email}/${apiHash}?docName=${docName}&uniqueid=${uniqueid}`,
        file
      );
    } else if (action === 'update' && docType === 'company') {
      return this.http.post<any>(
        `https://elpsdemo.dpr.gov.ng/api/CompanyDocument/UpdateFile/${docTypeId}/${compId}/company?docid=${docTypeId}`,
        file
      );
    } else if (!action || (action === 'create' && docType === 'facility')) {
      return this.http.post<any>(
        `https://elpsdemo.dpr.gov.ng/api/Facility/UploadFile/${docTypeId}/${compId}/${facilityId}/${email}/${apiHash}?docName=${docName}&uniqueid=${uniqueid}`,
        file
      );
    } else if (action === 'update' && docType === 'facility') {
      return this.http.post<any>(
        `https://elpsdemo.dpr.gov.ng/api/FacilityDocument/UpdateFile/${docTypeId}/${facilityId}?docid=${docTypeId}`,
        file
      );
    } else
      return this.http.post<any>(
        `https://elpsdemo.dpr.gov.ng/api/UploadCompanyDoc/${docTypeId}/${compId}/${email}/${apiHash}?docName=${docName}&uniqueid=${uniqueid}`,
        file
      );
  }

  getAllCompanyDocuments(
    docType: 'facility' | 'company',
    email: string,
    apiHash: string
  ) {
    let url: string;

    if (docType === 'company') {
      url = `https://elpsdemo.dpr.gov.ng/api/Documents/Types/${email}/${apiHash}`;
    } else {
      url = `https://elpsdemo.dpr.gov.ng/api/Documents/Facility/${email}/${apiHash}/${docType}`;
    }

    return this.http.get<any>(url);
  }

  submitApplication(payload) {
    return this.http.post<any>(
      `${environment.apiUrl}/application/submit-application`,
      payload
    );
  }
}
