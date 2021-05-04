import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OnboardingService } from '@delon/abc/onboarding';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    constructor(private http: _HttpClient, private cdr: ChangeDetectorRef, private obSrv: OnboardingService, private platform: Platform) {}

    ngOnInit(): void {}
}
