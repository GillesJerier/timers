import {Component, OnInit} from '@angular/core';
import {TimersService} from "./timers.service";

@Component({
    selector: 'app-timers',
    templateUrl: './timers.component.html',
    styleUrls: ['./timers.component.scss']
})
export class TimersComponent implements OnInit {
    types: { type: string, label: string }[];
    selectedType: string;

    constructor(private timersService: TimersService) {

    }

    ngOnInit(): void {
        this.types = this.timersService.timersType;
    }

    onTypeSelected(event) {
        if (event) {
            this.selectedType = event;
        }
    }
}
