import { CookieService } from 'ngx-cookie-service';
import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { DA_SERVICE_TOKEN, ITokenService, SocialService } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../_services';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
    form: FormGroup;
    error = '';
    returnUrl: string = '';
    showErr = false;
    errorMsg = '';
    loading: boolean = false;

    constructor(
        fb: FormBuilder,
        private router: Router,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private startupSrv: StartupService,
        public msg: NzMessageService,
        private authService: AuthService,
        private cookieService:CookieService
    ) {
        this.form = fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true],
        });

        let userData = {
            userId:"b3d1e71c-3977-46ad-bcf7-ac09932143d7",
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            token_type: 'Bearer',
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjM4OTU2YmM3YTUxMzVhYzhkOGZiMiIsImlhdCI6MTYxMzM2MjY5NiwiZXhwIjoxNjEzNDQ5MDk2fQ.bavNR98NQeo93ZwtwOfpMPAEX18xlgM7vy3e6tj2AL0",
        };
        const now = new Date();
        now.setHours(now.getHours() + 24);
        this.cookieService.set('gononet-erp-userId', userData.userId, now);
        this.cookieService.set('gononet-erp-token', userData.token, now);
        localStorage.setItem('_token', JSON.stringify(userData));

        this.tokenService.set(userData);
        console.log(userData);
    }

    get userName(): AbstractControl {
        return this.form.controls.userName;
    }
    get password(): AbstractControl {
        return this.form.controls.password;
    }

    submit(): void {
    }
    ngOnDestroy(): void {}
}
