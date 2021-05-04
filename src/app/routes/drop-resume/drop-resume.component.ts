import { NotificationService } from './../../_services/notification.service';
import { ResumeService } from './../../_services/resume.service';
import { Skill } from './../../_models/skill';
import { Certificate } from './../../_models/certificate';
import { Work } from './../../_models/work';
import { Education } from './../../_models/education';
import { General } from './../../_models/general';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { LocalstorageService } from 'src/app/_services';

@Component({
    selector: 'app-drop-resume',
    templateUrl: './drop-resume.component.html',
    styleUrls: ['./drop-resume.component.less']
})
export class DropResumeComponent implements OnInit {
    steps:any="0";
    isMiddle:boolean=false;
    isLast:boolean=false;
    isLoading:boolean=false;
    resumeForm:FormGroup;
    generalInfo:General=new General();
    educationInfo:Education[]=[];
    workInfo:Work[]=[];
    certificateInfo:Certificate[]=[];
    skillInfo:Skill[]=[];
    fileList: NzUploadFile[] = []
    constructor(
        private fb:FormBuilder,
        private localStorageService:LocalstorageService,
        private resumeService:ResumeService,
        private notifyService:NotificationService
    ) { 
        this.resumeForm= this.fb.group({
            general: this.fb.group({
                firstName:['',Validators.required],
                lastName:['',Validators.required],
                fathersName:['',Validators.required],
                mothersName:[''],
                gender:['',Validators.required],
                dateOfBirth:['',Validators.required],
                maritialStatus:['',Validators.required],
                religion:['',Validators.required],
                nationality:['',Validators.required]
            }),
            contact: this.fb.group({
                currentAddress:['',Validators.required],
                currentDistrict:['',Validators.required],
                currentUpozila:['',Validators.required],
                currentPostCode:['',Validators.required],
                currentCountry:['',Validators.required],
                permanentAddress:['',Validators.required],
                permanentDistrict:['',Validators.required],
                permanentUpozila:['',Validators.required],
                permanentPostCode:['',Validators.required],
                permanentCountry:['',Validators.required],
                emailAddress:['',[Validators.required,Validators.email]],
                mobileNumber:['',Validators.required],
                telephoneNumber:[''],
                onlinePresence:['']
            }),
            education: this.fb.array([]),
            work: this.fb.array([]),
            skill: this.fb.array([]),
            certificate:this.fb.array([]),
            haveNoExperience:[false]
        });
    }

    ngOnInit(): void {
    }
    changeSteps(val:any){
       this.steps=val;
       if(this.steps !='0' && this.steps!='6'){
           this.isMiddle=true;
           this.isLast=false;
       }else{
            this.isMiddle=false;
       }
       (this.steps=='6') ? this.isLast=true : this.isLast=false;
    }

    beforeUpload = (file: NzUploadFile): boolean => {
        this.fileList=[];
        this.fileList = this.fileList.concat(file);
        return false;
    };

    saveSkill(){
        this.generalInfo=new General();
        this.educationInfo=[];
        this.workInfo=[];
        this.skillInfo=[];
        this.certificateInfo=[];
        if(this.localStorageService.get('skill')){
            this.resumeForm.value.skill= JSON.parse(this.localStorageService.get('skill'));
        }
        if(this.resumeForm.value.work.length >0){
            this.resumeForm.value.work.map((obj:any)=>{
                obj['haveNoExperience']=false;
            });
        }
        if(this.resumeForm.value.education.length >0){
            this.resumeForm.value.education.map((obj:any)=>{
                obj['result']=obj.grade;
            });
        }
        this.generalInfo= {...this.resumeForm.value.general,...this.resumeForm.value.contact};
        this.educationInfo=this.resumeForm.value.education;
        if(this.resumeForm.value.haveNoExperience){
            this.workInfo=[
                {
                    id:"",
                    resumeId:"",
                    title:"",
                    company:"",
                    description:"",
                    city:"",
                    isWorking:false,
                    startMonth:"",
                    startYear:"",
                    endMonth:"",
                    endYear:"",
                    haveNoExperience:this.resumeForm.value.haveNoExperience
                }
            ];

        }else{
            this.workInfo=this.resumeForm.value.work;
        }
        this.skillInfo=this.resumeForm.value.skill;
        this.certificateInfo=this.resumeForm.value.certificate;
        let reqdata={
            "generalInfo": {
              "resumeId": "941cc5aa-45ba-4ea7-8b4a-80be5f1559e1",
              "firstName": this.generalInfo.firstName,
              "lastName": this.generalInfo.lastName,
              "fathersName":this.generalInfo.fathersName,
              "mothersName": this.generalInfo.mothersName,
              "gender": this.generalInfo.gender,
              "dateOfBirth": this.generalInfo.dateOfBirth,
              "currentAddress": this.generalInfo.currentAddress,
              "currentPostCode": this.generalInfo.currentPostCode,
              "currentUpozila": this.generalInfo.permanentUpozila,
              "currentDistrict": this.generalInfo.currentDistrict,
              "currentCountry": this.generalInfo.currentCountry,
              "permanentAddress": this.generalInfo.permanentAddress,
              "permanentPostCode":  this.generalInfo.permanentPostCode,
              "permanentUpozila":  this.generalInfo.permanentUpozila,
              "permanentDistrict": this.generalInfo.permanentDistrict,
              "permanentCountry":  this.generalInfo.permanentCountry,
              "emailAddress": this.generalInfo.emailAddress,
              "telephoneNumber": this.generalInfo.telephoneNumber,
              "mobileNumber": this.generalInfo.mobileNumber,
              "nationality":  this.generalInfo.nationality,
              "maritalStatus": this.generalInfo.maritialStatus,
              "religion":  this.generalInfo.religion,
              "onlinePresence":this.generalInfo.onlinePresence
            },
            "educationInfo": this.educationInfo,
            "workExperience": this.workInfo,
            "skill": this.skillInfo,
            "licenseCertificate":this.certificateInfo
        };

        this.isLoading=true;
        this.resumeService.saveResumedata(reqdata)
        .subscribe(
            (data)=>{
                if(data.success && data.statusCode==201){
                    this.notifyService.showSuccess("Successfully Saved","Resume Data Save");
                    this.isLoading=false;
                }
            },
            (err)=>{
                this.isLoading=false;
                this.notifyService.showError(err,"Resume Data Save");
            }
        )
    }

}
