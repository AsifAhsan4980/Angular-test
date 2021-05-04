import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from './../../../../_services/notification.service';
import { DropdownListService } from './../../../../_services/dropdownlist.service';
import { LocalstorageService } from 'src/app/_services';

@Component({
    selector: 'app-resume-form-four',
    templateUrl: './resume-form-four.component.html',
    styleUrls: ['./resume-form-four.component.less'],
})
export class ResumeFormFourComponent implements OnInit {
    @Input() childForm!: FormGroup;
    months: any = [];
    years: any = [];
    countryLists: any = [];
    districtList:any=[];
    endYears:any=[];
    constructor(
        private dropdownService: DropdownListService,
        private notifyService: NotificationService,
        private fb: FormBuilder,
        private localStorageService:LocalstorageService
    ) {}
    ngOnInit(): void {
        this.getCountryLists();
        if(this.getControls().length <=0){
            if(!this.localStorageService.get("work")){
                this.clearExperience();
                if(this.getControls().length == 0){
                    this.addExperience(this.childForm.controls.work);
                }
            }else{
                this.clearExperience();
                let work = JSON.parse(this.localStorageService.get("work"));
                for(var i=0;i<work.length;i++){
                    this.addExperience(this.childForm.controls.work,work[i]);
                }
            }
        }
        if(this.localStorageService.get("hasExperience")){
            this.childForm.patchValue({
                'haveNoExperience': JSON.parse(this.localStorageService.get("hasExperience"))
            });
        }
    }
    getControls() {
        return (this.childForm.get('work') as FormArray).controls;
    }
    addExperience(control: any, data ?:any) {
        control.push(
            this.fb.group({
                title: [((data && data.title) ? data.title:''), Validators.required],
                company: [((data && data.company) ? data.company:''), Validators.required],
                city: [((data && data.city) ? data.city:''), Validators.required],
                country: [((data && data.country) ? data.country:''), Validators.required],
                isWorking: [((data && data.isWorking) ? data.isWorking: false)],
                startMonth: [((data && data.startMonth) ? data.startMonth:''), Validators.required],
                startYear: [((data && data.startYear) ? data.startYear:''), Validators.required],
                endMonth: [((data && data.endMonth) ? data.endMonth:'')],
                endYear: [((data && data.endYear) ? data.endYear:'')],
                description: [((data && data.description) ? data.description:''), Validators.required],
            }),
        );
    }
    clearExperience(){
        if(this.getControls().length >0){
            for(var i=0;i<this.getControls().length;i++){
                this.removeExperience(this.childForm.controls.work,i);
            }
        }
    }
    removeExperience(control: any, index: any) {
        control.removeAt(index);
    }
    getCountryLists() {
        this.dropdownService.getCountryList2().subscribe(
            (res: any) => {
                this.countryLists = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Country List');
            },
            ()=>{
                this.getDistrictLists();
            }
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
            ()=>{
                this.getMonthLists();
            }
        );
    }
    getMonthLists(){
        this.dropdownService.getMonthList().subscribe(
            (res: any) => {
                this.months = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Month List');
            },
            ()=>{
                this.getYearLists();
            }
        );
    }
    getYearLists(){
        this.dropdownService.getYearList().subscribe(
            (res: any) => {
                this.years = res;
                this.endYears=res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Year List');
            }
        );
    }
    changeFromYear(val:any){
        this.endYears=[];
        this.endYears=this.years.filter((el:any)=> parseInt(el.year) >= parseInt(val));
    }
}
