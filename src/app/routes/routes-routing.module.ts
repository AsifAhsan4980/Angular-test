import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { AuthGuard } from '../_helpers';

// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';

// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';

import { EmployerSearchComponent } from './employer/employer-search/employer-search.component';
import { DropResumeComponent } from './empolyees/drop-resume/drop-resume.component';
import { EmployerActionsPanelComponent } from './empolyees/employer-actions-panel/employer-actions-panel.component';
import { PostJobFormComponent } from './employer/post-job-form/post-job-form.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        canActivate: [],
        canActivateChild: [],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: '', component: DashboardComponent, pathMatch: 'full' },
            { path: 'drop-resume', component: DropResumeComponent, pathMatch: 'full' },
            { path: 'employer-search', component: EmployerSearchComponent, pathMatch: 'full' },
            { path: 'employer', component: EmployerActionsPanelComponent, pathMatch: 'full' },
            { path: 'employer/:resume_id', component: EmployerActionsPanelComponent, pathMatch: 'full' },
            { path: 'exception', loadChildren: () => import('./exception/exception.module').then((m) => m.ExceptionModule) },
            { path: 'postJob', component: PostJobFormComponent, pathMatch: 'full' },
        ],
    },
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            {
                path: 'login',
                component: UserLoginComponent,
                data: { title: 'Login', titleI18n: 'app.login.login' },
            },
            {
                path: 'register',
                component: UserRegisterComponent,
                data: { title: 'Register', titleI18n: 'app.register.register' },
            },
        ],
    },
    { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: environment.useHash,
            scrollPositionRestoration: 'top',
        }),
    ],
    exports: [RouterModule],
})
export class RouteRoutingModule {}
