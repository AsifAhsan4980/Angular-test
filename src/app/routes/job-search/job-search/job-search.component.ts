import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-job-search',
    templateUrl: './job-search.component.html',
    styleUrls: ['./job-search.component.less']
})
export class JobSearchComponent implements OnInit {

    faMapMarkerAlt:any=faMapMarkerAlt;
    constructor() { }

    ngOnInit(): void {
    }

}
