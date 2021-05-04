import { LocalstorageService } from './../../../_services/localstorage.service';
import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-resume-form',
    templateUrl: './resume-form.component.html',
    styleUrls: ['./resume-form.component.less']
})
export class ResumeFormComponent implements OnInit {
    @Output() changeSteps = new EventEmitter();
    educationLevels:any=[];
    educationFields:any=[];
    current=0;
    total=7;
    showPrevious:boolean=false;
    isDisabled:boolean=false;
    childForm:any;
    constructor(
        private parenF: FormGroupDirective,
        private localStorageService:LocalstorageService
    ) { }

    ngOnInit(): void {
        this.childForm=this.parenF.form;
        this.changeSteps.emit(this.current.toString());
    }

    pre(): void {
        this.current -= 1;
        (this.current>0) ? this.showPrevious=true : this.showPrevious=false;
        this.changeSteps.emit(this.current.toString());
    }
    
    next(): void {
        if(this.current==0){
            this.localStorageService.remove("general");
            this.localStorageService.set("general",JSON.stringify(this.childForm.value.general));
        }
        if(this.current==1){
            this.isDisabled=false;
            (this.childForm.controls.general.valid) ? this.isDisabled=true : this.isDisabled=false;
            this.localStorageService.remove("contact");
            this.localStorageService.set("contact",JSON.stringify(this.childForm.value.contact));
        }
        if(this.current==2){
            this.localStorageService.remove("education");
            this.localStorageService.set("education",JSON.stringify(this.childForm.value.education));
        }
        if(this.current==3){
            this.localStorageService.remove("hasExperience");
            this.localStorageService.set("hasExperience",JSON.stringify(this.childForm.value.haveNoExperience));

            this.localStorageService.remove("work");
            this.localStorageService.set("work",JSON.stringify(this.childForm.value.work));
        }
        if(this.current==4){
            this.localStorageService.remove("skill");
            this.localStorageService.set("skill",JSON.stringify(this.childForm.value.skill));
        }
        if(this.current==5){
            this.localStorageService.remove("certificate");
            this.localStorageService.set("certificate",JSON.stringify(this.childForm.value.certificate));
        }
        this.current += 1;
        (this.current>0) ? this.showPrevious=true : this.showPrevious=false;
        this.changeSteps.emit(this.current.toString());
    }
    eduLevels(val:any){
        this.educationLevels=val;
    }
    eduFields(val:any){
        this.educationFields=val;
    }

}
