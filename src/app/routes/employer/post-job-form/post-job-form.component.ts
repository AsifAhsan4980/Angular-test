import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalstorageService, NotificationService } from 'src/app/_services';

@Component({
    selector: 'app-post-job-form',
    templateUrl: './post-job-form.component.html',
    styleUrls: ['./post-job-form.component.less'],
})
export class PostJobFormComponent implements OnInit {
    postJobForm!: FormGroup;
    steps: any = '0';
    isMiddle: boolean = false;
    isLast: boolean = false;
    isLoading: boolean = false;

    constructor(private fb: FormBuilder, private localStorageService: LocalstorageService, private notifyService: NotificationService) {
        this.postJobForm = this.fb.group({
            postResumeOne: this.fb.group({
                companyName: ['', Validators.required],
                address: ['', Validators.required],
                district: ['', Validators.required],
                yourRole: ['', Validators.required],
                yourName: ['', Validators.required],
                contactNumber: ['', Validators.required],
            }),
        });
    }

    ngOnInit(): void {}

    changeSteps(val: any) {
        this.steps = val;
        if (this.steps != '0') {
            this.isLast = true;
        } else {
            this.isMiddle = true;
        }
        this.steps == '1' ? (this.isLast = true) : (this.isLast = false);
    }
}
