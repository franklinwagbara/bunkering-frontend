import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

import { AuthenticationService, GenericService} from '../services';
import { Router} from '@angular/router';
import { Location } from '@angular/common';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private genk: GenericService,
        private locate: Location,
        private router: Router) {
            
        }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(retry(2), catchError(err => {

            if (err.status === 401 || err.status === 403) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                let returl = this.router.routerState.snapshot.url;
                //this.locate.replaceState('/' + this.genk.auth + '/login' + '?returnUrl=' + returl);
                this.router.navigate(['/' + 'login'], { queryParams: { returnUrl: returl } });
                //window.location.reload();
            }
            if (err.status === 400) {
                const head = 'An error occurred';
                //this.userdat.logYawa(err.error.message, head);
                return EMPTY;
            }
            return EMPTY;
        }))
    }
}
