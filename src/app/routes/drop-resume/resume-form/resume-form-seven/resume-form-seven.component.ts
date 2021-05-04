import { LocalstorageService } from './../../../../_services/localstorage.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-resume-form-seven',
    templateUrl: './resume-form-seven.component.html',
    styleUrls: ['./resume-form-seven.component.less'],
})
export class ResumeFormSevenComponent implements OnInit {
    @Input() childForm !:any;
    @Input() educationLevels!:any;
    @Input() educationFields!:any;
    general:any=null;
    contact:any=null;
    education:any=null;
    work:any=null;  
    skill:any=null;
    certificate=null;
    hasExperience:boolean=false;
    dob:string='';
    pa:string='';

    showGeneralEditForm:boolean=false;
    showContactEditForm:boolean=false;
    showEducationEditForm:boolean=false;
    showWorkEditForm:boolean=false;
    showSkillEditForm:boolean=false;
    showCertificateEditForm:boolean=false;

    constructor(
        private localstorage : LocalstorageService
    ) {}

    ngOnInit(): void {
        if(this.localstorage.get("general")){
            this.general=JSON.parse(this.localstorage.get("general"));
        }
        if(this.localstorage.get("contact")){
            this.contact=JSON.parse(this.localstorage.get("contact"));
        }
        if(this.localstorage.get("education")){
            this.education=JSON.parse(this.localstorage.get("education"));
        }
        if(this.localstorage.get("work")){
            this.work=JSON.parse(this.localstorage.get("work"));
        }
        if(this.localstorage.get("skill")){
            this.skill=JSON.parse(this.localstorage.get("skill"));
        }
        if(this.localstorage.get("certificate")){
            this.certificate=JSON.parse(this.localstorage.get("certificate"));
        }
        if(this.localstorage.get("hasExperience")){
            this.hasExperience=JSON.parse(this.localstorage.get("hasExperience"));
        }
        if(this.general){
            var date=new Date(this.general.dateOfBirth).getDate();
            var month=new Date(this.general.dateOfBirth).getMonth();
            var year=new Date(this.general.dateOfBirth).getFullYear();
            this.dob=date+"."+month+"."+year;
        }
        if(this.contact){
            this.pa=this.contact.currentAddress+", "+this.contact.currentUpozila+", "+this.contact.currentDistrict+", "+this.contact.currentCountry+", "+this.contact.currentPostCode;
        }
    }

    toggleForm(val:any){
        if(val=="general"){
            this.showGeneralEditForm ? this.showGeneralEditForm=false : this.showGeneralEditForm=true;
        }
        else if(val=="contact"){
            this.showContactEditForm ? this.showContactEditForm=false : this.showContactEditForm=true;
        }
        else if(val=="education"){
            this.showEducationEditForm ? this.showEducationEditForm=false : this.showEducationEditForm=true;
        }
        else if(val=="work"){
            this.showWorkEditForm ? this.showWorkEditForm=false : this.showWorkEditForm=true;
        }
        else if(val=="skill"){
            this.showSkillEditForm ? this.showSkillEditForm=false : this.showSkillEditForm=true;
        }
        else if(val=="certificate"){
            this.showCertificateEditForm ? this.showCertificateEditForm=false : this.showCertificateEditForm=true;
        }
    }
    saveData(val:any){
        if(val=='general'){
            this.localstorage.remove("general");
            this.localstorage.set("general",JSON.stringify(this.childForm.value.general));
        }
        else if(val=="contact"){
            this.localstorage.remove("contact");
            this.localstorage.set("contact",JSON.stringify(this.childForm.value.contact));
        }
        else if(val=="education"){
            this.localstorage.remove("education");
            this.localstorage.set("education",JSON.stringify(this.childForm.value.education));
        }
        else if(val=="work"){
            this.localstorage.remove("work");
            this.localstorage.set("work",JSON.stringify(this.childForm.value.work));
        }
        else if(val=="skill"){
            this.localstorage.remove("skill");
            this.localstorage.set("skill",JSON.stringify(this.childForm.value.skill));
        }
        else if(val=="certificate"){
            this.localstorage.remove("certificate");
            this.localstorage.set("certificate",JSON.stringify(this.childForm.value.certificate));
        }

        this.toggleForm(val);
        this.ngOnInit();
    }

    getName(id:any,arrName:any){
        if(arrName=='level'){
            if(this.educationLevels && this.educationLevels.length >0){
                return this.educationLevels.filter((edu:any)=> edu.educationLevelId==id)[0].educationLevelName;
            }
        }else{
            if(this.educationFields && this.educationFields.length >0){
                return this.educationFields.filter((edu:any)=> edu.educationFieldId==id)[0].educationFieldName;
            }
        }
    }
}
