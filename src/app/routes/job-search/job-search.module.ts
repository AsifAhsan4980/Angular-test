import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobResultsComponent } from './job-results/job-results.component';



@NgModule({
  declarations: [JobSearchComponent, JobResultsComponent],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule
  ],
  exports:[JobSearchComponent]
})
export class JobSearchModule { }
