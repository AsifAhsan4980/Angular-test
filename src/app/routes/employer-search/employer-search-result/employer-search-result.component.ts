import { NotificationService } from './../../../_services/notification.service';
import { DropdownListService } from './../../../_services/dropdownlist.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-employer-search-result',
    templateUrl: './employer-search-result.component.html',
    styleUrls: ['./employer-search-result.component.less'],
})
export class EmployerSearchResultComponent implements OnInit {
    @Output() hoverEvent = new EventEmitter();
    visible: boolean = false;
    @Input() resumeInfo: any = [];
    @Input() filterTitle: any = [];
    months: any = [];

    constructor(private dropdownService: DropdownListService, private notifyService: NotificationService) {}

    ngOnInit(): void {
        this.hoverEvent.emit('false');
        this.getMonthLists();
    }
    change(val: any) {
        this.visible = val;
    }

    mouseEnter(val: any) {
        this.hoverEvent.emit(val);
    }
    mouseLeave(val: any) {
        this.hoverEvent.emit('false');
    }
    _dateFormatter(res: any) {
        var lastupdate: any = new Date(res);
        var date = lastupdate.getDate();
        var month = lastupdate.getMonth();
        if (this.months.filter((el: any) => el.id == month).length > 0) {
            month = this.months.filter((el: any) => el.id == month)[0].name;
        }
        var year = lastupdate.getYear();
        return date + '-' + month + '-' + year;
    }
    getMonthLists() {
        this.dropdownService.getMonthList().subscribe(
            (res: any) => {
                this.months = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Month List');
            },
        );
    }
}
