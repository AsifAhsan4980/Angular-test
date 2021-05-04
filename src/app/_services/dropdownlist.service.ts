import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DropdownListService {
    getComapany() {
        throw new Error('Method not implemented.');
    }
    baseUrlLtype = '/locationm/api/v1/locationTypes';

    constructor(private router: Router, private http: HttpClient) {}

    getCountryList2() {
        return this.http.get('/assets/country-list.json').pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getLanguageList2() {
        return this.http.get('/assets/language-list.json').pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getDistrictList() {
        return this.http.get('/assets/district.json').pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getMonthList() {
        return this.http.get('/assets/month.json').pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getYearList() {
        return this.http.get('/assets/year.json').pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#region Education
    getEducationField() {
        return this.http.get(`${environment.resumeUrl}/education-field`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getEducationLevel() {
        return this.http.get(`${environment.resumeUrl}/education-level`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#endregion
    //#region Skill
    getSkill(page: any, limit: any) {
        return this.http.get(`${environment.resumeUrl}/skill?page=${page}&limit=${limit}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    saveSkill(data: any) {
        return this.http.post(`${environment.resumeUrl}/skill`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#endregion
    getAllGeneralInfo() {
        return this.http.get(`${environment.resumeUrl}/generalInfo`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getAllEducationInfo() {
        return this.http.get(`${environment.resumeUrl}/education-info`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getAllWorkInfo() {
        return this.http.get(`${environment.resumeUrl}/work-experience-info`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getAllLicenceInfo() {
        return this.http.get(`${environment.resumeUrl}/license-certificate-info`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getComapnyInfo() {
        return this.http.get(`${environment.resumeUrl}/industry`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
}
