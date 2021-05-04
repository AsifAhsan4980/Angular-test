import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models';
import { CookieService } from 'ngx-cookie-service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('_token') || '{}'));
        this.user = this.userSubject.asObservable();
    }
    userUrl = '/user/GononetUserCreationService/api/v1';

    public get userValue(): any {
        const allCookies: {} = this.cookieService.getAll();
        // if (this.tokenExpired()) {
        //     this.router.navigateByUrl(this.tokenService.login_url!);
        // }
        return this.userSubject.value;
    }
    // public get isLoggedIn(): boolean {
    //     let authToken = localStorage.getItem('_token');
    //     return authToken !== null ? true : false;
    // }
    // getCookie(key: string) {
    //     return this.cookieService.get(key);
    // }
    // tokenExpired() {
    //     const isLoggedIn = this.userSubject.value && this.userSubject.value.expired;
    //     if (isLoggedIn) {
    //         var now = Date.now();
    //         var expires = this.userSubject.value.expired;
    //         // console.log(`now    : ${new Date(now).toLocaleString()}\nexpires: ${new Date(expires).toLocaleString()}`);
    //         const isExpired = now > expires;
    //         return isExpired;
    //     }
    //     return false;
    // }
    // register(user: User) {
    //     return this.http.post(`${environment.apiUrl}/user/user_registration`, user).pipe(
    //         map((res: any) => {
    //             return res;
    //         }),
    //         catchError((error) => {
    //             console.log('in catch function = ', error);
    //             return throwError(error);
    //             // return throwError( 'Something went wrong!' );
    //         }),
    //     );
    // }
    // login(data: any) {
    //     return this.http.post(`${environment.apiUrl}/user_login`, data).pipe(
    //         map((user: any) => {
    //             if (user.response.responseCode == 200) {
    //                 let userData = {
    //                     userId: user.userId,
    //                     firstName: '',
    //                     lastName: '',
    //                     userName: '',
    //                     email: '',
    //                     password: '',
    //                     token_type: 'Bearer',
    //                     token: user.token,
    //                 };
    //                 const now = new Date();
    //                 now.setHours(now.getHours() + 24);
    //                 this.cookieService.set('gononet-erp-userId', user.userId, now);
    //                 this.cookieService.set('gononet-erp-token', user.token, now);
    //                 localStorage.setItem('_token', JSON.stringify(userData));
    //                 this.userSubject.next(userData);
    //                 return {
    //                     responseCode: user.response.responseCode,
    //                     userId: user.userId,
    //                 };
    //             } else {
    //                 return user.response;
    //             }
    //         }),
    //         catchError((error) => {
    //             console.log('in catch function = ', error);
    //             return throwError(error);
    //         }),
    //     );
    // }
    // getUserDetailByAccessToken(id: string) {
    //     return this.http.get<any>(`${environment.apiUrl}/user/_user_by_id?userid=${id}`).pipe(
    //         // return this.http.get<any>(`${environment.apiUser}/_user_by_id?userid=${id}`).pipe(
    //         map((user: any) => {
    //             let userData = {
    //                 userId: user.userId,
    //                 firstName: user.firstName,
    //                 lastName: user.lastName,
    //                 userName: user.loginId,
    //                 email: user.email,
    //                 token: this.userValue.token,
    //                 token_type: this.userValue.token_type,
    //             };
    //             localStorage.setItem('_token', JSON.stringify(userData));
    //             this.userSubject.next(userData);
    //             return userData;
    //         }),
    //         catchError((error) => {
    //             return throwError(error);
    //         }),
    //     );
    // }
    logout() {
        this.cookieService.deleteAll();
        this.userSubject.next(null);
    }
    // verifyEmail(token: string) {
    //     let data = {
    //         token: token,
    //     };
    //     return this.http.put(`${environment.apiUrl}${this.userUrl}/users/confirm-account`, data).pipe(
    //         map((res: any) => {
    //             return res;
    //         }),
    //         catchError((error) => {
    //             return throwError('Something went wrong!');
    //         }),
    //     );
    // }
    // passwordReset(userName: string) {
    //     return this.http
    //         .post(`${environment.apiUrl}${this.userUrl}/users/password/forgot`, {
    //             userName,
    //         })
    //         .pipe(
    //             map((res: any) => {
    //                 return res;
    //             }),
    //             catchError((error) => {
    //                 return throwError('Something went wrong!');
    //             }),
    //         );
    // }
    // passwordChanged(data: any) {
    //     return this.http.post(`${environment.apiUrl}${this.userUrl}/users/password/reset`, data).pipe(
    //         map((res: any) => {
    //             return res;
    //         }),
    //         catchError((error) => {
    //             return throwError('Something went wrong!');
    //         }),
    //     );
    // }
    // getById(id: string) {
    //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    // }
    // update(id: string, params: any) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
    //         map((x) => {
    //             /* update stored user if the logged in user updated their own record */
    //             if (id == this.userValue) {
    //                 /* update local storage
	// 				          const user = { ...this.userValue, ...params };
	// 				          localStorage.setItem('user', JSON.stringify(user));

	// 				          /* publish updated user to subscribers */
    //                 // this.userSubject.next(user);
    //             }
    //             return x;
    //         }),
    //     );
    // }
    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
    //         map((x) => {
    //             /* auto logout if the logged in user deleted their own record */
    //             // if (id == this.userValue.userId) {
    //             //     this.logout();
    //             // }
    //             return x;
    //         }),
    //     );
    // }
    // dummyRegister(data: any) {
    //     return this.http.post(`${environment.apiCluster}/queue_listener`, data).pipe(
    //         map((res: any) => {
    //             return res;
    //         }),
    //         catchError((error) => {
    //             console.log('in catch function = ', error);
    //             return throwError(error);
    //         }),
    //     );
    // }
    // private getServerErrorMessage(error: HttpErrorResponse): string {
    //     switch (error.status) {
    //         case 404: {
    //             return `Not Found: ${error.message}`;
    //         }
    //         case 403: {
    //             return `Access Denied: ${error.message}`;
    //         }
    //         case 405: {
    //             return `Method Not Allowed response: ${error.message}`;
    //         }
    //         case 500: {
    //             return `Internal Server Error: ${error.message}`;
    //         }
    //         default: {
    //             return `Unknown Server Error: ${error.message}`;
    //         }
    //     }
    // }
}
