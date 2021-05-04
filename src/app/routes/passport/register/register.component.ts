import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/_services';

@Component({
	selector: 'passport-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
	form: FormGroup;
	error = '';
	type = 0;
	visible = false;
	submitted = false;
	status = 'pool';
	progress = 0;
	passwordProgressMap = {
		ok: 'success',
		pass: 'normal',
		pool: 'exception',
	};

	constructor(
			fb: FormBuilder, 
			private router: Router, 
			public http: _HttpClient, 
			public msg: NzMessageService,
			private authService : AuthService
		) {
		this.form = fb.group({
			clientId: ['cl001'],
			firstName: [null, [Validators.required]],
			lastName: [null, [Validators.required]],
			loginId: [null, [Validators.required]],
			email: [null, [Validators.required, Validators.email]],
			mobilePrefix: ['+880'],
      		mobile: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
			password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
			confirm: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.passwordEquar]],
			agree: [false,[Validators.required]],
			phoneNumber: [],
			isActive: true
		});
	}

	// #region fields
	get f() { return this.form.controls; }
	get mail(): AbstractControl {
		return this.form.controls.email;
	}
	get mobile(): AbstractControl {
		return this.form.controls.mobile;
	}
	get password(): AbstractControl {
		return this.form.controls.password;
	}
	get confirm(): AbstractControl {
		return this.form.controls.confirm;
	}
	get agree(): AbstractControl {
		return this.form.controls.agree;
	}
	// #endregion

	// #region get captcha

	count = 0;
	interval$: any;

	static checkPassword(control: FormControl): NzSafeAny {
		if (!control) {
			return null;
		}
		const self: any = this;
		self.visible = !!control.value;
		if (control.value && control.value.length > 9) {
			self.status = 'ok';
		} else if (control.value && control.value.length > 5) {
			self.status = 'pass';
		} else {
			self.status = 'pool';
		}

		if (self.visible) {
			self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
		}
	}
	static passwordEquar(control: FormControl): { equar: boolean } | null {
		if (!control || !control.parent) {
			return null;
		}
		if (control.value !== control.parent.get('password')!.value) {
			return { equar: true };
		}
		return null;
	}

	// #endregion

	submit(): void {
	
	}

	ngOnDestroy(): void {
		if (this.interval$) {
			clearInterval(this.interval$);
		}
	}
}
