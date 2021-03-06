import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, take, tap } from 'rxjs/operators';

const CODEMESSAGE: { [key: number]: string } = {
	200: 'The server successfully returned the requested data.',
	201: 'The request has been fulfilled, resulting in the creation of a new resource',
	202: 'The request has been accepted for processing, but the processing has not been completed. ',
	204: 'The server successfully processed the request, and is not returning any content.',
	400: 'There was an error in the request sent, and the server did not create or modify data.',
	401: 'The user does not have permission.Unauthorized.',
	403: 'The request contained valid data and was understood by the server, but the server is refusing action. ',
	404: 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
	406: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.',
	410: 'Indicates that the resource requested is no longer available and will not be available again. ',
	422: 'Unprocessable Entity',
	500: 'Internal Server Error',
	502: 'Bad Gateway',
	503: 'Service Unavailable',
	504: 'Gateway Timeout',
};

	/**
	 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
	 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
	private refreshTokenType: 're-request' | 'auth-refresh' = 'auth-refresh';
	private refreshToking = false;
	private refreshToken$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private injector: Injector) {
		if (this.refreshTokenType === 'auth-refresh') {
			this.buildAuthRefresh();
		}
	}

	private get notification(): NzNotificationService {
		return this.injector.get(NzNotificationService);
	}

	private get tokenSrv(): ITokenService {
		return this.injector.get(DA_SERVICE_TOKEN);
	}

	private get http(): _HttpClient {
		return this.injector.get(_HttpClient);
	}

	private goTo(url: string): void {
		setTimeout(() => this.injector.get(Router).navigateByUrl(url));
	}

	private checkStatus(ev: HttpResponseBase): void {
		if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
		return;
		}

		const errortext = CODEMESSAGE[ev.status] || ev.statusText;
		this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
	}

	/**
	 * 刷新 Token 请求
	 */
	private refreshTokenRequest(): Observable<any> {
		const model = this.tokenSrv.get();
		return this.http.post(`/api/auth/refresh`, null, null, { headers: { refresh_token: model?.refresh_token || '' } });
	}

	// #region 刷新Token方式一：使用 401 重新刷新 Token

	private tryRefreshToken(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// 1、若请求为刷新Token请求，表示来自刷新Token可以直接跳转登录页
		if ([`/api/auth/refresh`].some((url) => req.url.includes(url))) {
		this.toLogin();
		return throwError(ev);
		}
		// 2、如果 `refreshToking` 为 `true` 表示已经在请求刷新 Token 中，后续所有请求转入等待状态，直至结果返回后再重新发起请求
		if (this.refreshToking) {
		return this.refreshToken$.pipe(
			filter((v) => !!v),
			take(1),
			switchMap(() => next.handle(this.reAttachToken(req))),
		);
		}
		// 3、尝试调用刷新 Token
		this.refreshToking = true;
		this.refreshToken$.next(null);

		return this.refreshTokenRequest().pipe(
		switchMap((res) => {
			// 通知后续请求继续执行
			this.refreshToking = false;
			this.refreshToken$.next(res);
			// 重新保存新 token
			this.tokenSrv.set(res);
			// 重新发起请求
			return next.handle(this.reAttachToken(req));
		}),
		catchError((err) => {
			this.refreshToking = false;
			this.toLogin();
			return throwError(err);
		}),
		);
	}

	/**
	 * 重新附加新 Token 信息
	 *
	 * > 由于已经发起的请求，不会再走一遍 `@delon/auth` 因此需要结合业务情况重新附加新的 Token
	 */
	private reAttachToken(req: HttpRequest<any>): HttpRequest<any> {
		// 以下示例是以 NG-ALAIN 默认使用 `SimpleInterceptor`
		const token = this.tokenSrv.get()?.token;
		return req.clone({
		setHeaders: {
			token: `Bearer ${token}`,
		},
		});
	}

	// #endregion

	// #region 刷新Token方式二：使用 `@delon/auth` 的 `refresh` 接口

	private buildAuthRefresh(): void {
		this.tokenSrv.refresh
		.pipe(
			filter(() => !this.refreshToking),
			switchMap(() => {
			this.refreshToking = true;
			return this.refreshTokenRequest();
			}),
		)
		.subscribe(
			(res) => {
			// TODO: Mock expired value
			res.expired = +new Date() + 1000 * 60 * 5;
			this.refreshToking = false;
			this.tokenSrv.set(res);
			},
			() => this.toLogin(),
		);
	}

	// #endregion

	private toLogin(): void {
		this.notification.error(`Not logged in or login has expired, please log in again`, ``);
		this.goTo('/passport/login');
	}

	private handleData(ev: HttpResponseBase, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		// 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
		if (ev.status > 0) {
		this.http.end();
		}
		this.checkStatus(ev);
		switch (ev.status) {
		case 200:
			// 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
			// 例如响应内容：
			//  错误内容：{ status: 1, msg: '非法参数' }
			//  正确内容：{ status: 0, response: {  } }
			// 则以下代码片断可直接适用
			// if (ev instanceof HttpResponse) {
			//   const body = ev.body;
			//   if (body && body.status !== 0) {
			//     this.injector.get(NzMessageService).error(body.msg);
			//     // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
			//     // this.http.get('/').subscribe() 并不会触发
			//     return throwError({});
			//   } else {
			//     // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
			//     return of(new HttpResponse(Object.assign(ev, { body: body.response })));
			//     // 或者依然保持完整的格式
			//     return of(ev);
			//   }
			// }
			break;
		case 401:
			if (this.refreshTokenType === 're-request') {
			return this.tryRefreshToken(ev, req, next);
			}
			this.toLogin();
			break;
		case 403:
		case 404:
		case 500:
			this.goTo(`/exception/${ev.status}`);
			break;
		default:
			if (ev instanceof HttpErrorResponse) {
			console.warn(
				'未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng-alain.com/docs/server 解决跨域问题',
				ev,
			);
			}
			break;
		}
		if (ev instanceof HttpErrorResponse) {
		return throwError(ev);
		} else {
		return of(ev);
		}
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// 统一加上服务端前缀
		let url = req.url;
		if (!url.startsWith('https://') && !url.startsWith('http://')) {
		url = environment.SERVER_URL + url;
		}

		const newReq = req.clone({ url });
		return next.handle(newReq).pipe(
		mergeMap((ev) => {
			// 允许统一对请求错误处理
			if (ev instanceof HttpResponseBase) {
			return this.handleData(ev, newReq, next);
			}
			// 若一切都正常，则后续操作
			return of(ev);
		}),
		catchError((err: HttpErrorResponse) => this.handleData(err, newReq, next)),
		);
	}
}
