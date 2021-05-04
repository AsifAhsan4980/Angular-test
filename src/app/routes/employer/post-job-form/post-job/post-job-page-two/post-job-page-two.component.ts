import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownListService, LocalstorageService, NotificationService } from 'src/app/_services';

@Component({
    selector: 'app-post-job-page-two',
    templateUrl: './post-job-page-two.component.html',
    styleUrls: ['./post-job-page-two.component.less'],
})
export class PostJobPageTwoComponent implements OnInit {
    @Input() childForm!: FormGroup;
    data: any;
    Detail$: any;
    textValue: any = ['Gononet'];
    countryLists: any = [];
    LanguageLists: any = [];
    editCountry: boolean = false;
    editLanguage: boolean = false;
    constructor(
        private dropdownService: DropdownListService,
        private notifyService: NotificationService,
        private localStorageService: LocalstorageService,
    ) {}

    ngOnInit(): void {
        this.getCountryLists();
        this.getLanguageLists();
    }
    // getEventDetail(): void {
    //     this.data.getDetail(this.id)
    //         .subscribe((data: any) => this.Detail$ = data);
    // }
    // id(id: any) {
    //     throw new Error('Method not implemented.');
    // }
    // setTitleEdit() {
    //     this.Detail$.forEach((t: { canEditCode: boolean; }) => t.canEditCode = false)
    //     this.Detail$.canEditCode = true
    // }
    getCountryLists() {
        this.dropdownService.getCountryList2().subscribe(
            (res: any) => {
                this.countryLists = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Country List');
            },
        );
    }
    getLanguageLists() {
        this.dropdownService.getLanguageList2().subscribe(
            (res: any) => {
                this.LanguageLists = res;
            },
            (err: any) => {
                this.notifyService.showError(err, 'Language List');
            },
        );
    }
    editCountryMode(event: any) {
        if (this.editCountry == true) {
            this.editCountry = false;
        } else {
            this.editCountry = true;
        }
    }
    editLanguageMode(event: any) {
        if (this.editLanguage == true) {
            this.editLanguage = false;
        } else {
            this.editLanguage = true;
        }
    }
}
