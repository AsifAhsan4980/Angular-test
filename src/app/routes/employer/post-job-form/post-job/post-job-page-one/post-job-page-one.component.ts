import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DropdownListService, LocalstorageService, NotificationService } from 'src/app/_services';

@Component({
    selector: 'app-post-job-page-one',
    templateUrl: './post-job-page-one.component.html',
    styleUrls: ['./post-job-page-one.component.less'],
})
export class PostJobPageOneComponent implements OnInit {
    @Input() childForm!: FormGroup;
    companyInfo: any = [];
    @Output() cmpnyInfo = new EventEmitter();

    constructor(
        private dropdownService: DropdownListService,
        private notifyService: NotificationService,
        private fb: FormBuilder,
        private localStorageService: LocalstorageService,
    ) {}

    ngOnInit(): void {
        if (this.localStorageService.get('company')) {
            let data: any = JSON.parse(this.localStorageService.get('company'));
            let control = <FormGroup>this.childForm.controls['company'];
            control.patchValue({
                businessName: data.firstName,
            });
        }
    }

    addCompany(control: any, data?: any) {
        control.push(
            this.fb.group({
                businessName: [data && data.businessName ? data.businessName : ''],
            }),
        );
    }

    getCompany() {
        this.dropdownService.getComapnyInfo().subscribe(
            (res: any) => {
                this.companyInfo = res;
                this.cmpnyInfo.emit(this.companyInfo);
                console.log(res);
            },
            (err: any) => {
                this.notifyService.showError(err, 'Education Level');
            },
        );
    }
}
