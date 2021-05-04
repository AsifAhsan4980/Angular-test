import { filter } from 'rxjs/operators';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DropdownListService } from 'src/app/_services/dropdownlist.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
    selector: 'app-employer-search-resume-summary',
    templateUrl: './employer-search-resume-summary.component.html',
    styleUrls: ['./employer-search-resume-summary.component.less'],
})
export class EmployerSearchResumeSummaryComponent implements OnInit {
    @Input() summaryInfo: any = [];
    @Input() filterTitle: any = [];
    @Input() loadResume!: boolean;
    months: any = [];
    years: any = [];
    endYears: any = [];

    constructor(private dropdownService: DropdownListService, private notifyService: NotificationService) {}

    ngOnInit(): void {
        this.getMonthLists();
    }

    getMonthLists() {
        this.dropdownService.getMonthList().subscribe(
            (res: any) => {
                this.months = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Month List');
            },
            () => {
                this.getYearLists();
            },
        );
    }
    getYearLists() {
        this.dropdownService.getYearList().subscribe(
            (res: any) => {
                this.years = res;
                this.endYears = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Year List');
            },
        );
    }
    changeFromYear(val: any) {
        this.endYears = [];
        this.endYears = this.years.filter((el: any) => parseInt(el.year) >= parseInt(val));
    }
    _monthFormatter(res: any) {
        var monthformat: any = new Date(res);
        var month = monthformat.getMonth() + 1;
        console.log(month);
        if (this.months.filter((el: any) => el.id == month).length > 0) {
            month = this.months.filter((el: any) => el.id == month)[0].name;
        }
        return month;
    }
    _yearFormatter(res: any) {
        var monthformat: any = new Date(res);
        var month = monthformat.getFullYear();
        return month;
    }
}
