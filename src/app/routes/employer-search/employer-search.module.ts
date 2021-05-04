import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared';
import { EmployerSearchComponent } from './employer-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployerSearchToolbarComponent } from './employer-search-toolbar/employer-search-toolbar.component';
import { EmployerSearchBarComponent } from './employer-search-bar/employer-search-bar.component';
import { EmployerSearchResultComponent } from './employer-search-result/employer-search-result.component';
import { EmployerSearchFilterComponent } from './employer-search-filter/employer-search-filter.component';
import { EmployerSearchResumeComponent } from './employer-search-resume/employer-search-resume.component';
import { EmployerSearchResumeFullComponent } from './employer-search-resume/employer-search-resume-full/employer-search-resume-full.component';
import { EmployerSearchResumeContactComponent } from './employer-search-resume/employer-search-resume-contact/employer-search-resume-contact.component';
import { EmployerSearchResumeSummaryComponent } from './employer-search-resume-summary/employer-search-resume-summary.component';

@NgModule({
    declarations: [
        EmployerSearchComponent,
        EmployerSearchToolbarComponent,
        EmployerSearchBarComponent,
        EmployerSearchResultComponent,
        EmployerSearchFilterComponent,
        EmployerSearchResumeComponent,
        EmployerSearchResumeFullComponent,
        EmployerSearchResumeContactComponent,
        EmployerSearchResumeSummaryComponent,
    ],
    imports: [CommonModule, SharedModule, FontAwesomeModule],
    exports: [EmployerSearchComponent, EmployerSearchFilterComponent, EmployerSearchResultComponent],
})
export class EmployerSearchModule {}
