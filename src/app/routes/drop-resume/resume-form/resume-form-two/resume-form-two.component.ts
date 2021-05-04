import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DropdownListService } from './../../../../_services/dropdownlist.service';
import { NotificationService } from './../../../../_services/notification.service';
import PhoneNumber from 'awesome-phonenumber';
import { LocalstorageService } from 'src/app/_services';

@Component({
    selector: 'app-resume-form-two',
    templateUrl: './resume-form-two.component.html',
    styleUrls: ['./resume-form-two.component.less']
})
export class ResumeFormTwoComponent implements OnInit {
    @Input() childForm !:FormGroup;
    countryLists:any=[];
    countryCode = 'BD';
    mobileCode = '880';
    // mobilePattern = `^((\\+${this.mobileCode}-?)|0)?[0-9]{${this.phoneE164.length.toString()}}$`;
    mobilePattern = `^((\\+${this.mobileCode}-?)|0)?[0-9]{10}$`;
    constructor(
        private dropdownService:DropdownListService,
        private notifyService:NotificationService,
        private localStorageService:LocalstorageService,
        private cdf:ChangeDetectorRef,
        private fb:FormBuilder
    ) { }

    ngOnInit(): void {
        this.getCountryLists();
        if(this.localStorageService.get("contact")){
            let data:any = JSON.parse(this.localStorageService.get("contact"));
            let control=(<FormGroup>this.childForm.controls['contact']);
            control.patchValue({
                currentAddress:(data.currentAddress) ? data.currentAddress:'',
                currentDistrict:(data.currentDistrict) ? data.currentDistrict: '',
                currentUpozila:(data.currentUpozila) ? data.currentUpozila : '',
                currentPostCode:(data.currentPostCode) ? data.currentPostCode: '',
                currentCountry:(data.currentCountry) ? data.currentCountry:'',
                permanentAddress:(data.permanentAddress) ? data.permanentAddress:'',
                permanentDistrict:(data.permanentDistrict) ? data.permanentDistrict:'',
                permanentUpozila:(data.permanentUpozila) ? data.permanentUpozila:'',
                permanentPostCode:(data.permanentPostCode) ? data.permanentPostCode:'',
                permanentCountry:(data.permanentCountry)?data.permanentCountry:'',
                emailAddress:(data.emailAddress) ? data.emailAddress:'',
                mobileNumber:(data.mobileNumber) ? data.mobileNumber:'',
                telephoneNumber:(data.telephoneNumber) ? data.telephoneNumber : '',
                onlinePresence:(data.onlinePresence) ? data.onlinePresence:''
            });
            // this.childForm= this.fb.group({
            //     contact: this.fb.group({
            //         currentAddress:[(data.currentAddress) ? data.currentAddress:''],
            //         currentDistrict:[(data.currentDistrict) ? data.currentDistrict: ''],
            //         currentUpozila:[(data.currentUpozila) ? data.currentUpozila : ''],
            //         currentPostCode:[(data.currentPostCode) ? data.currentPostCode: ''],
            //         currentCountry:[(data.currentCountry) ? data.currentCountry:''],
            //         permanentAddress:[(data.permanentAddress) ? data.permanentAddress:''],
            //         permanentDistrict:[(data.permanentDistrict) ? data.permanentDistrict:''],
            //         permanentUpozila:[(data.permanentUpozila) ? data.permanentUpozila:''],
            //         permanentPostCode:[(data.permanentPostCode) ? data.permanentPostCode:''],
            //         permanentCountry:[(data.permanentCountry)?data.permanentCountry:''],
            //         emailAddress:[(data.emailAddress) ? data.emailAddress:''],
            //         mobileNumber:[(data.mobileNumber) ? data.mobileNumber:''],
            //         telephoneNumber:[(data.telephoneNumber) ? data.telephoneNumber : ''],
            //         onlinePresence:[(data.onlinePresence) ? data.onlinePresence:'']
            //     })
            // });
        }
    }
    getCountryLists(){
        this.dropdownService.getCountryList2().subscribe(
            (res:any) => {
              this.countryLists = res;
            },
            (err:any) => {
              this.notifyService.showError(err, 'Country List');
            }
        );
    }

    onChangeCountry(obj: any) {
		const selected: any = this.countryLists.filter((c: any) => c.name == obj);
		// if(selected.length > 0){
		// 	this.countryCode = selected[0].code;
		// 	this.mobileCode = PhoneNumber.getCountryCodeForRegionCode(selected[0].code).toString();
		// 	const len = this.phoneHint.length;
		// 	this.mobilePattern = `^((\\+${this.mobileCode}-?)|0)?[0-9]{${len.toString()}}$`;
		// }
	}
    get phoneHint(): string {
		const hint = PhoneNumber.getExample(this.countryCode, 'fixed-line').getNumber('e164');
		return hint.replace(`+${this.mobileCode}`, '');
    }
    get phoneE164(): string {
      	return PhoneNumber.getExample(this.countryCode, 'mobile').getNumber('e164');
    }
    ngAfterContentChecked() {
        this.cdf.detectChanges();
    }
}
