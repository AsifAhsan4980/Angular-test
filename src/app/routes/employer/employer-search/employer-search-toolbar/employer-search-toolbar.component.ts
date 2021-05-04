import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-employer-search-toolbar',
    templateUrl: './employer-search-toolbar.component.html',
    styleUrls: ['./employer-search-toolbar.component.less'],
})
export class EmployerSearchToolbarComponent implements OnInit {
    faMapMarkerAlt: any = faMapMarkerAlt;
    constructor() {}

    ngOnInit(): void {}
}
