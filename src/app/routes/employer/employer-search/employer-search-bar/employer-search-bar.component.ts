import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons';
import { title } from 'process';
import { NotificationService } from 'src/app/_services/notification.service';
import { ResumeService } from 'src/app/_services/resume.service';

@Component({
    selector: 'app-employer-search-bar',
    templateUrl: './employer-search-bar.component.html',
    styleUrls: ['./employer-search-bar.component.less'],
})
export class EmployerSearchBarComponent implements OnInit {
    faSliderH: any = faSlidersH;
    faSearch: any = faSearch;
    searchForm: FormGroup;
    @Input() titleInfo: any = [];
    @Input() locationInfo: any = [];
    @Output() resume = new EventEmitter();
    resumeInfo: any = [];
    constructor(private resumeService: ResumeService, private fb: FormBuilder, private notifyService: NotificationService) {
        this.searchForm = this.fb.group({
            title: [''],
            place: [''],
        });
    }

    ngOnInit(): void {}

    searchData() {
        const { title, place } = this.searchForm.value;
        this.resumeService.resumeSearch(title, place).subscribe(
            (res: any) => {
                this.resumeInfo = res;
                this.resume.emit(res);
            },
            (err: any) => {
                this.notifyService.showError(err, 'Error in database');
            },
        );
    }
}
