import { title } from 'process';
import { InputBoolean } from '@delon/util';
import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { valueFunctionProp } from 'ng-zorro-antd/core/util';

@Component({
    selector: 'app-employer-search-filter',
    templateUrl: './employer-search-filter.component.html',
    styleUrls: ['./employer-search-filter.component.less'],
})
export class EmployerSearchFilterComponent implements OnInit {
    @Input() resumeInfo: any = [];
    @Input() resumeInfoDup: any = [];
    @Output() noResume = new EventEmitter();
    @Output() dataEmitter = new EventEmitter();
    checkAllArray: any = [];
    p: any = [];
    experience: any = ['1-2', '3-5', '6-10', '11-40'];
    education: any = ['Masters', 'Bachelors', 'Diploma', 'Higher Secondery', 'Secondery'];

    ngOnInit(): void {}
    filterByWorkTitle: any = [];

    onChange(response: any, data: any, token: any) {
        let filterByWorkTitle = [];
        let filterByCompanyName = [];
        let filterByWorkExperience = [];
        let filterByEducation = [];
        let checkWorkExperience = false;
        let checkEducation = false;
        let checkWorkExperienceYear = false;
        let allresume: boolean = true;

        if (response == true) {
            this.checkAllArray.push({ type: token, title: data });
            console.log(this.resumeInfo);
        } else {
            this.checkAllArray = this.checkAllArray.filter((val: any) => val.title !== data);
        }

        if (this.checkAllArray.length === 0) {
            allresume = false;
        }
        for (const singleResumeInfo of this.resumeInfo.data) {
            for (const selectedArray of this.checkAllArray) {
                if (selectedArray.type === 1 || selectedArray.type === 2) {
                    for (const singleWorkExp of singleResumeInfo.workExperienceDetails) {
                        if (selectedArray.type === 1) {
                            checkWorkExperience = true;

                            if (selectedArray.title == singleWorkExp.title) {
                                filterByWorkTitle.push(singleResumeInfo);
                                break;
                            }
                        }
                        if (selectedArray.type === 2) {
                            checkWorkExperience = true;
                            if (selectedArray.title == singleWorkExp.company) {
                                filterByCompanyName.push(singleResumeInfo);
                                break;
                            }
                        }
                    }
                }
                if (selectedArray.type === 3) {
                    let year = selectedArray.title.split('-');
                    checkEducation = true;
                    checkWorkExperienceYear = true;
                    const totalWorkExperienceYear = Number(singleResumeInfo.totalWorkExperience.year);
                    if (Number(year[0]) - 1 <= totalWorkExperienceYear && totalWorkExperienceYear < Number(year[1])) {
                        filterByWorkExperience.push(singleResumeInfo);
                    }
                }
                if (selectedArray.type === 4) {
                    checkEducation = true;
                    for (const singleEducation of singleResumeInfo.educationDetails) {
                        if (selectedArray.title == singleEducation.educationLevel) {
                            filterByEducation.push(singleResumeInfo);
                            break;
                        }
                    }
                }
            }
        }
        let filterByWorkTitleList: any = new Set(filterByWorkTitle);
        let filterByCompanyNameList: any = new Set(filterByCompanyName);
        let filterByWorkExperienceList: any = new Set(filterByWorkExperience);
        let filterByEducationList: any = new Set(filterByEducation);
        let intersection: any = [];
        let intersection2: any = [];
        let resumeInfoList: any = [];

        if (Array.from(filterByWorkExperienceList).length === 0 && checkWorkExperienceYear) {
            resumeInfoList = [];
        } else {
            intersection =
                filterByCompanyName.length === 0
                    ? filterByWorkTitleList
                    : filterByWorkTitle.length === 0
                    ? filterByCompanyNameList
                    : new Set([...filterByWorkTitleList].filter((x) => filterByCompanyNameList.has(x)));

            intersection2 =
                filterByWorkExperience.length === 0
                    ? filterByEducationList
                    : filterByEducation.length === 0
                    ? filterByWorkExperienceList
                    : new Set([...filterByWorkExperienceList].filter((x) => filterByEducationList.has(x)));

            var list = Array.from(intersection);
            var list2 = Array.from(intersection2);

            resumeInfoList =
                list.length === 0
                    ? checkWorkExperience
                        ? []
                        : intersection2
                    : list2.length === 0
                    ? checkEducation
                        ? []
                        : intersection
                    : new Set([...intersection].filter((x) => intersection2.has(x)));

            resumeInfoList = Array.from(resumeInfoList);
        }
        this.dataEmitter.emit(resumeInfoList);
        this.noResume.emit(allresume);
    }
}
