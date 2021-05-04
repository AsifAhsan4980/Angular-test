import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { DropResumeComponent } from './drop-resume/drop-resume.component';
import { ResumeFormFiveComponent } from './drop-resume/resume-form/resume-form-five/resume-form-five.component';
import { ResumeFormFourComponent } from './drop-resume/resume-form/resume-form-four/resume-form-four.component';
import { ResumeFormOneComponent } from './drop-resume/resume-form/resume-form-one/resume-form-one.component';
import { ResumeFormSevenComponent } from './drop-resume/resume-form/resume-form-seven/resume-form-seven.component';
import { ResumeFormSixComponent } from './drop-resume/resume-form/resume-form-six/resume-form-six.component';
import { ResumeFormThreeComponent } from './drop-resume/resume-form/resume-form-three/resume-form-three.component';
import { ResumeFormTwoComponent } from './drop-resume/resume-form/resume-form-two/resume-form-two.component';
import { ResumeFormComponent } from './drop-resume/resume-form/resume-form.component';
@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        DropResumeComponent,
        ResumeFormComponent,
        ResumeFormOneComponent,
        ResumeFormTwoComponent,
        ResumeFormThreeComponent,
        ResumeFormFourComponent,
        ResumeFormFiveComponent,
        ResumeFormSixComponent,
        ResumeFormSevenComponent,
    ],
    exports: [],
    entryComponents: [],
})
export class EmployeeModule {}
