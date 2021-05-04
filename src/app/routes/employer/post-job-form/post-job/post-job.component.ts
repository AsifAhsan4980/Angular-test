import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { LocalstorageService } from 'src/app/_services';

@Component({
    selector: 'app-post-job',
    templateUrl: './post-job.component.html',
    styleUrls: ['./post-job.component.less'],
})
export class PostJobComponent implements OnInit {
    @Output() changeSteps = new EventEmitter();
    childForm: any;
    current = 0;
    total = 2;
    showPrevious: boolean = false;
    isDisabled: boolean = false;
    company: any = [];

    constructor(private parenF: FormGroupDirective, private localStorageService: LocalstorageService) {}

    ngOnInit(): void {
        this.childForm = this.parenF.form;
        this.changeSteps.emit(this.current.toString());
    }
    pre(): void {
        this.current -= 1;
        this.current > 0 ? (this.showPrevious = true) : (this.showPrevious = false);
        this.changeSteps.emit(this.current.toString());
    }

    next(): void {
        if (this.current == 0) {
            // this.localStorageService.remove("general");
            // this.localStorageService.set("general",JSON.stringify(this.childForm.value.general));
        }
        if (this.current == 1) {
            this.isDisabled = false;
            this.childForm.controls.general.valid ? (this.isDisabled = true) : (this.isDisabled = false);
            // this.localStorageService.remove("contact");
            // this.localStorageService.set("contact",JSON.stringify(this.childForm.value.contact));
        }
        this.current += 1;
        this.current > 0 ? (this.showPrevious = true) : (this.showPrevious = false);
        this.changeSteps.emit(this.current.toString());
    }
    cmpnyInfo(val: any) {
        this.company = val;
        console.log(val);
    }
}
