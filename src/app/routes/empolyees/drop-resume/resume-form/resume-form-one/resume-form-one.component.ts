import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, Output } from '@angular/core';
import { LocalstorageService } from 'src/app/_services';

@Component({
    selector: 'app-resume-form-one',
    templateUrl: './resume-form-one.component.html',
    styleUrls: ['./resume-form-one.component.less'],
})
export class ResumeFormOneComponent implements OnInit {
    @Input() childForm!: FormGroup;
    constructor(private localStorageService: LocalstorageService, private fb: FormBuilder) {}

    ngOnInit(): void {
        if (this.localStorageService.get('general')) {
            let data: any = JSON.parse(this.localStorageService.get('general'));
            let control = <FormGroup>this.childForm.controls['general'];
            control.patchValue({
                firstName: data.firstName,
                lastName: data.lastName,
                fathersName: data.fathersName,
                mothersName: data.mothersName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                maritialStatus: data.maritialStatus,
                religion: data.religion,
                nationality: data.nationality,
            });
        }
    }
    onChange(e: any) {
        console.log(e);
    }
}
