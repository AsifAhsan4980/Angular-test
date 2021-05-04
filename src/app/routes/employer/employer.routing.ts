import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployerComponent } from '../employer/employer.component';

const routes: Routes = [
    {
        path: '',
        component: EmployerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployerRoutingModule {}
