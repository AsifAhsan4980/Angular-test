import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class companyService {
    constructor(private router: Router, private http: HttpClient) {}

    //getcompanyinfo

    getCompanyInfo(id: any) {
        return this.http.get(`${environment.resumeUrl}/industry/${id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
}
