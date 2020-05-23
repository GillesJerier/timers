import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import * as moment from "moment";
import {Moment} from "moment";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TimersService} from "../timers.service";

@Component({
    selector: 'app-timer-dialog',
    templateUrl: './timer-dialog.component.html',
    styleUrls: ['./timer-dialog.component.scss']
})
export class TimerDialogComponent implements OnInit, OnDestroy {
    @ViewChild('regularBeep', {static: true}) regularBeep;
    countdown: { minutes: number, seconds: number, total: Moment, passedSeconds: number }
        = {minutes: 0, seconds: 0, total: moment(), passedSeconds: 0};
    timerSubs: Subscription;
    private pauseToggle = false
    private pauseCountDown = new BehaviorSubject<boolean>(false);

    constructor(
        private timersService: TimersService,
        @Inject(MAT_DIALOG_DATA) public data: { capTime: { minutes: string, seconds: string, total: number }, isEmom: boolean }) {
    }

    ngOnInit() {
        this.startTimer();
    }

    onPauseResumeTimer() {
        this.pauseToggle = !this.pauseToggle
        this.pauseCountDown.next(this.pauseToggle);
    }

    resetCountdown() {
        this.countdown = {minutes: 0, seconds: 0, total: moment(), passedSeconds: 0};
    }

    resetCapTime() {
        this.data.capTime.total = 0;
        this.data.capTime.minutes = this.data.capTime.seconds = '0';
    }

    startTimer() {
        this.countdown.minutes = parseInt(this.data.capTime.minutes, 10);
        this.countdown.seconds = parseInt(this.data.capTime.seconds, 10);
        this.data.capTime.total = parseInt(this.data.capTime.minutes, 10) * 60 + parseInt(this.data.capTime.seconds);

        if (this.data.capTime) {
            this.timerSubs = this.timersService
                .getPausableTimer(this.pauseCountDown, this.data.capTime.total)
                .subscribe(() => {
                    this.countdown.passedSeconds++;
                    const left = this.data.capTime.total - this.countdown.passedSeconds;
                    this.countdown.minutes = Math.floor(left / 60);
                    this.countdown.seconds = left % 60;

                    if (this.data.isEmom && this.countdown.seconds === 0) {
                        this.timersService.playBeep(this.regularBeep);
                    }

                    if (left <= 0) {
                        this.resetCapTime();
                        this.resetCountdown();
                        this.timerSubs.unsubscribe();
                    }
                });
        }
    }

    ngOnDestroy(): void {
        if (this.timerSubs) {
            this.timerSubs.unsubscribe();
        }
    }
}
