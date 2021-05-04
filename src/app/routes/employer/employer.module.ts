import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { EmployerComponent } from './employer.component';
import { EmployerActionsPanelComponent } from '../empolyees/employer-actions-panel/employer-actions-panel.component';
import { EmployerSearchToolbarComponent } from './employer-search/employer-search-toolbar/employer-search-toolbar.component';
import { EmployerSearchResultComponent } from './employer-search/employer-search-result/employer-search-result.component';
import { EmployerSearchBarComponent } from './employer-search/employer-search-bar/employer-search-bar.component';
import { EmployerSearchComponent } from './employer-search/employer-search.component';
import { EmployerSearchFilterComponent } from './employer-search/employer-search-filter/employer-search-filter.component';
import { EmployerSearchResumeComponent } from './employer-search/employer-search-resume/employer-search-resume.component';
import { EmployerSearchResumeFullComponent } from './employer-search/employer-search-resume/employer-search-resume-full/employer-search-resume-full.component';
import { EmployerSearchResumeContactComponent } from './employer-search/employer-search-resume/employer-search-resume-contact/employer-search-resume-contact.component';
import { EmployerSearchResumeSummaryComponent } from './employer-search/employer-search-resume-summary/employer-search-resume-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostJobFormComponent } from './post-job-form/post-job-form.component';
import { PostJobComponent } from './post-job-form/post-job/post-job.component';
import { PostJobPageOneComponent } from './post-job-form/post-job/post-job-page-one/post-job-page-one.component';
import { PostJobPageTwoComponent } from './post-job-form/post-job/post-job-page-two/post-job-page-two.component';

@NgModule({
    imports: [CommonModule, SharedModule, FontAwesomeModule],
    declarations: [
        EmployerActionsPanelComponent,
        EmployerComponent,
        EmployerSearchComponent,
        EmployerSearchToolbarComponent,
        EmployerSearchBarComponent,
        EmployerSearchResultComponent,
        EmployerSearchFilterComponent,
        EmployerSearchResumeComponent,
        EmployerSearchResumeFullComponent,
        EmployerSearchResumeContactComponent,
        EmployerSearchResumeSummaryComponent,
        PostJobFormComponent,
        PostJobComponent,
        PostJobPageOneComponent,
        PostJobPageTwoComponent,
    ],
    exports: [],
    entryComponents: [],
})
export class EmployerModule {}
