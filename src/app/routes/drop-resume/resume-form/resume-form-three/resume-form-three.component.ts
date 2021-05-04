import { LocalstorageService } from './../../../../_services/localstorage.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { NotificationService } from './../../../../_services/notification.service';
import { DropdownListService } from './../../../../_services/dropdownlist.service';

@Component({
    selector: 'app-resume-form-three',
    templateUrl: './resume-form-three.component.html',
    styleUrls: ['./resume-form-three.component.less'],
})
export class ResumeFormThreeComponent implements OnInit {
    @Input() childForm!: FormGroup;
    @Output() eduLevels = new EventEmitter();
    @Output() eduFields = new EventEmitter();
    formYear: any = '';
    months: any = [];
    years: any = [];
    endYears: any = [];
    countryLists: any = [];
    districtList: any = [];
    educationLevel: any = [];
    educationField: any = [];
    constructor(
        private dropdownService: DropdownListService,
        private notifyService: NotificationService,
        private fb: FormBuilder,
        private localStorageService: LocalstorageService,
    ) {}

    ngOnInit(): void {
        this.getCountryLists();
        if (this.getControls().length <= 0) {
            if (!this.localStorageService.get('education')) {
                this.clearEducation();
                this.addEducation(this.childForm.controls.education);
            } else {
                this.clearEducation();
                var edu = JSON.parse(this.localStorageService.get('education'));
                edu.map((obj: any) => {
                    this.addEducation(this.childForm.controls.education, obj);
                });
            }
        }
    }

    getControls() {
        return (this.childForm.get('education') as FormArray).controls;
    }

    //#region education add delete function
    addEducation(control: any, data?: any) {
        control.push(
            this.fb.group({
                educationLevelId: [data && data.educationLevelId ? data.educationLevelId : '', Validators.required],
                educationFieldId: [data && data.educationFieldId ? data.educationFieldId : '', Validators.required],
                institution: [data && data.institution ? data.institution : '', Validators.required],
                grade: [data && data.grade ? data.grade : '', Validators.required],
                city: [data && data.city ? data.city : '', Validators.required],
                country: [data && data.country ? data.country : '', Validators.required],
                isStudying: [data && data.isStudying ? data.isStudying : false],
                startMonth: [data && data.startMonth ? data.startMonth : '', Validators.required],
                startYear: [data && data.startYear ? data.startYear : '', Validators.required],
                endMonth: [data && data.endMonth ? data.endMonth : ''],
                endYear: [data && data.endYear ? data.endYear : ''],
            }),
        );
    }
    removeEducation(control: any, index: any) {
        control.removeAt(index);
    }

    clearEducation() {
        if (this.getControls().length > 0) {
            for (var i = 0; i < this.getControls().length; i++) {
                this.removeEducation(this.childForm.controls.education, i);
            }
        }
    }
    //#endregion
    getCountryLists() {
        this.dropdownService.getCountryList2().subscribe(
            (res: any) => {
                this.countryLists = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Country List');
            },
            () => {
                this.getDistrictLists();
            },
        );
    }
    getDistrictLists() {
        this.dropdownService.getDistrictList().subscribe(
            (res: any) => {
                this.districtList = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'District List');
            },
            () => {
                this.getMonthLists();
            },
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
            () => {
                this.getEducationLevel();
            },
        );
    }
    //#region education dropdown
    getEducationLevel() {
        this.dropdownService.getEducationLevel().subscribe(
            (res: any) => {
                this.educationLevel = res;
                this.eduLevels.emit(this.educationLevel);
            },
            (err: any) => {
                this.notifyService.showError(err, 'Education Level');
            },
            () => {
                this.getEducationField();
            },
        );
    }
    getEducationField() {
        this.dropdownService.getEducationField().subscribe(
            (res: any) => {
                this.educationField = res;
                this.eduFields.emit(this.educationField);
            },
            (err: any) => {
                this.notifyService.showError(err, 'Education Field');
            },
        );
    }
    //#endregion
    changeFromYear(val: any) {
        this.endYears = [];
        this.endYears = this.years.filter((el: any) => parseInt(el.year) > parseInt(val));
    }
}
