import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { RecentSearchComponent } from './recent-search/recent-search.component';
import { JobFeedComponent } from './job-feed.component';

@NgModule({
    declarations: [JobsComponent, RecentSearchComponent, JobFeedComponent],
    imports: [CommonModule, SharedModule],
    exports: [JobFeedComponent],
})
export class JobFeedModule {}
