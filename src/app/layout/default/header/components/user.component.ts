import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User } from '@delon/theme';
import { AuthService } from 'src/app/_services';

@Component({
    selector: 'header-user',
    template: `
        <div
            class="alain-default__nav-item d-flex align-items-center px-sm"
            nz-dropdown
            nzPlacement="bottomRight"
            [nzDropdownMenu]="userMenu"
        >
            <i nz-icon nzType="user" nzTheme="outline"></i>
        </div>
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
            <div nz-menu class="width-md">
                <div nz-menu-item>
                    <span><b>shawkat.islam@gmail.com</b></span>
                </div>
                <li nz-menu-divider></li>
                <div nz-menu-item class="custom-menu-item-header">
                    <span>{{ 'app.header.user.profile' | translate }}</span>
                    <i nz-icon nzType="file-done" nzTheme="outline"></i>
                </div>
                <div nz-menu-item class="custom-menu-item-header">
                    <span>{{ 'app.header.user.jobs' | translate }}</span>
                    <i nz-icon nzType="heart" nzTheme="outline"></i>
                </div>
                <div nz-menu-item routerLink="/exception/trigger" class="custom-menu-item-header">
                    <span>{{ 'app.header.user.reviews' | translate }}</span>
                    <i nz-icon nzType="file-sync" nzTheme="outline"></i>
                </div>
                <div nz-menu-item routerLink="/exception/trigger" class="custom-menu-item-header">
                    <span>{{ 'app.header.user.email' | translate }}</span>
                    <i nz-icon nzType="mail" nzTheme="outline"></i>
                </div>
                <div nz-menu-item routerLink="/exception/trigger" class="custom-menu-item-header">
                    <span>{{ 'app.header.user.search' | translate }}</span>
                    <i nz-icon nzType="search" nzTheme="outline"></i>
                </div>
                <div nz-menu-item routerLink="/exception/trigger" class="custom-menu-item-header">
                    <span>{{ 'app.header.user.settings' | translate }}</span>
                    <i nz-icon nzType="control" nzTheme="outline"></i>
                </div>
                <div nz-menu-item routerLink="/exception/trigger">
                    <span>{{ 'app.header.user.help' | translate }}</span>
                </div>
                <li nz-menu-divider></li>
                <div nz-menu-item (click)="logout()" style="text-align:center">
                    {{ 'app.header.signout' | translate }}
                </div>
            </div>
        </nz-dropdown-menu>
    `,
    styleUrls: ['../header.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

// <nz-avatar [nzSrc]="user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
export class HeaderUserComponent {
    get user(): User {
        return this.settings.user;
    }

    constructor(
        private settings: SettingsService,
        private router: Router,
        private authService: AuthService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    ) {}

    logout(): void {
        this.tokenService.clear();
        this.authService.logout();
        this.router.navigateByUrl(this.tokenService.login_url!);
    }
}
