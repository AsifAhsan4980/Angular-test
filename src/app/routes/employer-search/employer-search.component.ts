import { Component, Input, OnInit } from '@angular/core';
import { NotificationService, ResumeService } from 'src/app/_services';

@Component({
    selector: 'app-employer-search',
    templateUrl: './employer-search.component.html',
    styleUrls: ['./employer-search.component.less'],
})
export class EmployerSearchComponent implements OnInit {
    @Input() resumeId!: any;
    showResumeSum: boolean = false;
    resumeInfo: any = [];
    summaryInfo: any = [];
    titleInfo: any = [];
    locationInfo: any = [];
    filterTitle: any = [];

    constructor(private resumeService: ResumeService, private notifyService: NotificationService) {}

    ngOnInit(): void {
        this.getResumeSearch();
        this.getTitleInfo();
        this.getLocationInfo();
    }
    hoverEvent(val: any) {
        if (val == 'false') {
            this.showResumeSum = false;
        } else {
            this.showResumeSum = true;
            this.summaryInfo = [];
            this.summaryInfo = this.resumeInfo.data[val];
        }
    }
    getResumeSearch() {
        this.resumeService.resumeSearch().subscribe(
            (res: any) => {
                this.resumeInfo = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Error in database');
            },
        );
    }
    getTitleInfo() {
        this.resumeService.getTitleInfo().subscribe(
            (res: any) => {
                this.titleInfo = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Error in database');
            },
        );
    }
    getLocationInfo() {
        this.resumeService.locationInfo().subscribe(
            (res: any) => {
                this.locationInfo = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Error in database');
            },
        );
    }

    resume(val: any) {
        this.resumeInfo = [];
        this.resumeInfo = val;
    }
    resumeFilterByTitle(val: any) {
        this.filterTitle = val;
    }
}
