import {Component, OnInit} from '@angular/core';
import {TimersService} from "../timers.service";
import {IntervalTimerDialogComponent} from "../interval-timer-dialog/interval-timer-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-interval-training',
    templateUrl: './interval-training.component.html',
    styleUrls: ['./interval-training.component.scss']
})
export class IntervalTrainingComponent implements OnInit {
    intervalTimer = {
        rounds: 2,
        work: 10,
        rest: 5,
    };

    constructor(private dialog: MatDialog, private timersService: TimersService) {
    }

    ngOnInit() {
    }

    onStartIntervalTraining() {
        this.dialog.open(
            IntervalTimerDialogComponent,
            {
                data: {interval: this.intervalTimer},
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                panelClass: 'timer-dialog-container'
            }
        );
    }

    onOpenInputDialog(type: string) {
        const dialogRef = this.timersService.openInputDialog(type);
        dialogRef.afterClosed().subscribe((input: string) => {
            this.intervalTimer[type] = input || 0;
        });
    }
}
