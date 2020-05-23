import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimersService} from "../timers.service";
import {MatDialog} from "@angular/material/dialog";
import {TimerDialogComponent} from "../timer-dialog/timer-dialog.component";

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
    @Input('emom') emom: boolean = false;
    capTime: { minutes: string, seconds: string, total: number }
        = {minutes: '0', seconds: '0', total: 0};
    @ViewChild('regularBeep', {static: true}) regularBeep;

    constructor(private timersService: TimersService, private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    onCountDown() {
        this.dialog.open(TimerDialogComponent, {
            data: {capTime: this.capTime, isEmom: this.emom},
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            panelClass: 'timer-dialog-container'
        });
    }

    onOpenInputDialog(type: string) {
        const dialogRef = this.timersService.openInputDialog(type);
        dialogRef.afterClosed().subscribe((input: string) => {
            if (input) {
                this.capTime[type] = input;
            }
        });
    }
}
