import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';
import { JobSearchModule } from './job-search/job-search.module';
import { JobFeedModule } from './job-feed/job-feed.module';
import { EmployerModule } from './employer/employer.module';
import { EmployeeModule } from './empolyees/employees.module';

@NgModule({
    imports: [SharedModule, RouteRoutingModule, JobFeedModule, JobSearchModule, EmployerModule, EmployeeModule],
    declarations: [DashboardComponent, UserLoginComponent, UserRegisterComponent],
})
export class RoutesModule {}
