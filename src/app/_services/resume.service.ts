import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ResumeService {
    constructor(private router: Router, private http: HttpClient) {}
    //#region General
    saveGeneralInfo(data: any) {
        return this.http.post(`${environment.resumeUrl}/generalInfo`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getGeneralInfo(id: any) {
        return this.http.get(`${environment.resumeUrl}/generalInfo/${id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    deleteGeneralInfo(id: any) {
        return this.http.delete(`${environment.resumeUrl}/generalInfo/${id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    updateGeneralInfo(id: any, data: any) {
        return this.http.patch(`${environment.resumeUrl}/generalInfo/${id}`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#endregion
    //#region Education
    saveEducationInfo(data: any) {
        return this.http.post(`${environment.resumeUrl}//education-info`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getEducationInfo(resume_id: any) {
        return this.http.get(`${environment.resumeUrl}/education-info/resume-id/${resume_id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#endregion
    //#region Work
    saveWorkInfo(data: any) {
        return this.http.post(`${environment.resumeUrl}/work-experience-info`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getWorkInfo(id: any) {
        return this.http.get(`${environment.resumeUrl}/work-experience-info/${id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#endregion
    //#region Licence
    saveLicenceInfo(data: any) {
        return this.http.post(`${environment.resumeUrl}/license-certificate-info`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    getLicenceInfo(id: any) {
        return this.http.get(`${environment.resumeUrl}/license-certificate-info/resume-id/${id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    //#endregion
    //#region  skill
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
    saveResumedata(data: any) {
        return this.http.post(`${environment.resumeUrl}/all-in-one-save`, data).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    resumeSearch(title?: any, place?: any) {
        return this.http
            .post(`${environment.resumeUrl}/all-in-one-save/search-resume?title=${title ? title : ''}&place=${place ? place : ''}`, {})
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError((error) => {
                    return throwError(error);
                }),
            );
    }
    getTitleInfo() {
        return this.http.get(`${environment.resumeUrl}/all-in-one-save/search-title`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    locationInfo() {
        return this.http.get(`${environment.resumeUrl}/all-in-one-save/resume-location`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
    resumeDetails(id?: any) {
        return this.http.get(`${environment.resumeUrl}/all-in-one-save/${id}`).pipe(
            map((res: any) => {
                return res;
            }),
            catchError((error) => {
                return throwError(error);
            }),
        );
    }
}
