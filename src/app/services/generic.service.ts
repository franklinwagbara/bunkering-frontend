import { Injectable} from '@angular/core';
import { HttpEventType, HttpParams} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GenericService {
    account = 'account';
    company = 'company';
    companyinformation = 'companyinformation';
    home = 'home';
    admin = 'admin';
    authCode = 'dd20c4e0-be39-4f25-90ff-a5b92693e12b';
}
