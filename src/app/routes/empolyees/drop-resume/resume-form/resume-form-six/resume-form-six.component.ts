import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { DropdownListService, LocalstorageService, NotificationService } from 'src/app/_services';

@Component({
    selector: 'app-resume-form-six',
    templateUrl: './resume-form-six.component.html',
    styleUrls: ['./resume-form-six.component.less'],
})
export class ResumeFormSixComponent implements OnInit {
    @Input() childForm!: FormGroup;
    months: any = [];
    years: any = [];
    endYears: any = [];
    countryLists: any = [];
    constructor(
        private fb: FormBuilder,
        private localStorageService: LocalstorageService,
        private dropdownService: DropdownListService,
        private notifyService: NotificationService,
    ) {}

    ngOnInit(): void {
        this.getMonthLists();
        if (this.getControls().length <= 0) {
            if (!this.localStorageService.get('certificate')) {
                this.clearCertificate();
                if (this.getControls().length == 0) {
                    this.addCertificate(this.childForm.controls.certificate);
                }
            } else {
                this.clearCertificate();
                let cert = JSON.parse(this.localStorageService.get('certificate'));
                cert.map((obj: any) => {
                    this.addCertificate(this.childForm.controls.certificate, obj);
                });
            }
        }
    }
    getControls() {
        return (this.childForm.get('certificate') as FormArray).controls;
    }
    removeCertificate(control: any, index: any) {
        control.removeAt(index);
    }
    clearCertificate() {
        if (this.getControls().length > 0) {
            for (var i = 0; i < this.getControls().length; i++) {
                this.removeCertificate(this.childForm.controls.certificate, i);
            }
        }
    }
    addCertificate(control: any, data?: any) {
        control.push(
            this.fb.group({
                title: [data && data.title ? data.title : '', Validators.required],
                description: [data && data.description ? data.description : '', Validators.required],
                isWorking: [data && data.isWorking ? data.isWorking : false],
                startMonth: [data && data.startMonth ? data.startMonth : '', Validators.required],
                startYear: [data && data.startYear ? data.startYear : '', Validators.required],
                endMonth: [data && data.endMonth ? data.endMonth : ''],
                endYear: [data && data.endYear ? data.endYear : ''],
            }),
        );
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
}
