import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/_services/resume.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
    selector: 'app-employer-search-resume-full',
    templateUrl: './employer-search-resume-full.component.html',
    styleUrls: ['./employer-search-resume-full.component.less'],
})
export class EmployerSearchResumeFullComponent implements OnInit {
    resumeDeatails: any = [];
    data: any = [];

    constructor(private route: ActivatedRoute, private resumeService: ResumeService, private notifyService: NotificationService) {}
    ngOnInit(): void {
        this.data = this.route.snapshot.params.resume_id;
        console.log(this.data);
        this.getResumeInfo();
    }
    getResumeInfo() {
        this.resumeService.resumeDetails(this.data).subscribe(
            (res: any) => {
                this.resumeDeatails = res;
                console.log(res);
            },
            (err: any) => {
                this.notifyService.showError(err, 'Error in database');
            },
        );
    }
}
