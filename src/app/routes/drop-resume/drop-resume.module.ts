import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropResumeComponent } from './drop-resume.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumeFormOneComponent } from './resume-form/resume-form-one/resume-form-one.component';
import { ResumeFormTwoComponent } from './resume-form/resume-form-two/resume-form-two.component';
import { ResumeFormThreeComponent } from './resume-form/resume-form-three/resume-form-three.component';
import { ResumeFormFourComponent } from './resume-form/resume-form-four/resume-form-four.component';
import { ResumeFormFiveComponent } from './resume-form/resume-form-five/resume-form-five.component';
import { ResumeFormSixComponent } from './resume-form/resume-form-six/resume-form-six.component';
import { ResumeFormSevenComponent } from './resume-form/resume-form-seven/resume-form-seven.component';



@NgModule({
  declarations: [DropResumeComponent, ResumeFormComponent, ResumeFormOneComponent, ResumeFormTwoComponent, ResumeFormThreeComponent, ResumeFormFourComponent, ResumeFormFiveComponent, ResumeFormSixComponent, ResumeFormSevenComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DropResumeModule { }
