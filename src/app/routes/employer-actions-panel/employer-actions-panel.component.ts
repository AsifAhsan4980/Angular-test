import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employer-actions-panel',
  templateUrl: './employer-actions-panel.component.html',
  styleUrls: ['./employer-actions-panel.component.less']
})
export class EmployerActionsPanelComponent implements OnInit {
    mode:any="horizontal";
    resumeId:any=null;
    constructor(
        private route:ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params:any)=>{
            if(params && params['resume_id']){
                this.resumeId= params['resume_id'];
            };
        })
    }

}
