import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OnboardingService } from '@delon/abc/onboarding';
import { _HttpClient } from '@delon/theme';

@Component({
    selector: 'app-dashboard-v1',
    templateUrl: './v1.component.html',
    styleUrls: ['./v1.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardV1Component implements OnInit {

    constructor(private http: _HttpClient, private cdr: ChangeDetectorRef, private obSrv: OnboardingService, private platform: Platform) {
    }

    ngOnInit(): void {
    
    }
}
