import { FormGroup } from '@angular/forms';
import { NotificationService } from './../../../../_services/notification.service';
import { DropdownListService } from './../../../../_services/dropdownlist.service';
import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/_services';

@Component({
    selector: 'app-resume-form-five',
    templateUrl: './resume-form-five.component.html',
    styleUrls: ['./resume-form-five.component.less'],
})
export class ResumeFormFiveComponent implements OnInit {
    @Input() childForm !:FormGroup;
    technical:any = [];
    language:any = [];
    techSkillList:any=[];
    lanSkillList:any=[];
    skillLists:any=[];
    ex_tech:any=[];
    ex_lan:any=[];
    loading:boolean=false;

    constructor(
        private dropdownService:DropdownListService,
        private notifyService:NotificationService,
        private localStorageService:LocalstorageService
    ) {}

    ngOnInit(): void {
        this.getSkills();
        if(this.localStorageService.get('skill')){
            let skills = JSON.parse(this.localStorageService.get('skill'));
            this.childForm.value.skill= skills;
            skills.map((el:any)=>{
                el.skillType ==0 ? this.lanSkillList.push(el.skillName) : this.techSkillList.push(el.skillName);
                el.skillType ==0 ? this.ex_lan.push(el) : this.ex_tech.push(el);
            });
        }
    }

    getSkills() {
        this.dropdownService.getSkill(0,30).subscribe(
            (res: any) => {
                this.skillLists = res.results;
                if(this.skillLists.length > 0){
                    this.technical=this.skillLists.filter((el:any)=> el.skillType==1);
                    this.language=this.skillLists.filter((el:any)=> el.skillType==0)
                }
            },
            (err: any) => {
                this.notifyService.showError(err, 'District List');
            }
        );
    }
    skillExists(key:any,arr:any) {
        return arr.some(function(el:any) {
          return el.skillName === key;
        }); 
    }

    //#region Technical Skill
    addSkill(arr :any){
        if(this.childForm.value.skill.length >0){
            this.childForm.value.skill=this.childForm.value.skill.filter((el:any)=> el.skillType != 1);
        }
        this.techSkillList=arr;
        this.techSkillList.map((el:any)=>{
            if(!this.skillExists(el,this.technical)){
                let data={
                    "id":"",
                    "resumeId":"",
                    "skillName": el,
                    "skillType": 1
                }
                this.childForm.value.skill.push(data);
            }else{
                let preData:any= this.technical.filter((ele:any)=> ele.skillName === el)[0];
                let newData={
                    "id": preData.id,
                    "resumeId": "",
                    "skillName":  preData.skillName,
                    "skillType": preData.skillType
                }
                this.childForm.value.skill.push(newData);
            }
        });
        console.log(this.childForm.value.skill);
       
    }
    //#endregion
    //#region Language Skill
    
    addLan(arr :any){
        if(this.childForm.value.skill.length >0){
            this.childForm.value.skill=this.childForm.value.skill.filter((el:any)=> el.skillType != 0);
        }
        this.lanSkillList=arr;
        this.lanSkillList.map((el:any)=>{
            if(!this.skillExists(el,this.language)){
                let data={
                    "id":"",
                    "resumeId":"",
                    "skillName": el,
                    "skillType": 0
                }
                this.childForm.value.skill.push(data);
            }else{
                let preData:any= this.language.filter((ele:any)=> ele.skillName === el)[0];
                let newData={
                    "id": preData.id,
                    "resumeId": "",
                    "skillName":  preData.skillName,
                    "skillType": preData.skillType
                }
                this.childForm.value.skill.push(newData);
            }
                    
        });
        console.log(this.childForm.value.skill);
    }
    //#endregion
}
