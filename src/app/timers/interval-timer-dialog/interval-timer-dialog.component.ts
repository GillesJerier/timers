import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TimersService} from "../timers.service";

@Component({
    selector: 'app-interval-timer-dialog',
    templateUrl: './interval-timer-dialog.component.html',
    styleUrls: ['./interval-timer-dialog.component.scss']
})
export class IntervalTimerDialogComponent implements OnInit, OnDestroy {
    @ViewChild('regularBeep', {static: true}) beep;
    @ViewChild('roundBeep', {static: true}) roundBeep;
    @ViewChild('doubleBeep', {static: true}) doubleBeep;
    workTime: number;
    restTime: number;
    currentRound: number = 1;
    toggleIntervalTimer = false;
    roundLeftSubject$ = new Subject<number>();
    pauseIntervalTimer$ = new BehaviorSubject<boolean>(false);
    workSubs: Subscription;
    restSubs: Subscription;

    constructor(@Inject(MAT_DIALOG_DATA) private timer: {
                    interval: {
                        rounds: number,
                        work: number,
                        rest: number
                    }
                },
                private timersService: TimersService) {
    }

    ngOnInit() {
        // call workoutTimer on every round
        this.roundLeftSubject$.subscribe((rounds: number) => {
            this.timersService.playBeep(this.roundBeep);
            this.workoutTimer(rounds);
            this.currentRound = this.timer.interval.rounds - rounds + 1;
        });
        this.startIntervalTimer();
    }

    onPauseIntervalTimer() {
        this.toggleIntervalTimer = !this.toggleIntervalTimer;
        this.pauseIntervalTimer$.next(this.toggleIntervalTimer);
    }

    startIntervalTimer() {
        if (this.timer.interval.rounds && this.timer.interval.work) {
            this.roundLeftSubject$.next(this.timer.interval.rounds);
        }
    }

    workoutTimer(roundCount: number) {
        this.workTime = this.timer.interval.work;
        this.workSubs = this.timersService
            .getPausableTimer(this.pauseIntervalTimer$, this.timer.interval.work)
            .subscribe(() => {
                this.workTime--;

                if (this.workTime <= 3 && this.workTime >= 1) {
                    this.timersService.playBeep(this.beep);
                }
                if (this.workTime <= 0) {
                    this.workSubs.unsubscribe();
                    this.timersService.playBeep(this.roundBeep);
                    if (roundCount > 1) {
                        this.restTimer(roundCount);
                    } else {
                        setTimeout(() => {
                            this.timersService.playBeep(this.roundBeep);
                        }, 300)
                    }
                }
            });
    }

    restTimer(roundCount: number) {
        this.restTime = this.timer.interval.rest;
        this.restSubs = this.timersService
            .getPausableTimer(this.pauseIntervalTimer$, this.timer.interval.rest)
            .subscribe(() => {
                this.restTime--;
                if (this.restTime <= 0) {
                    this.restSubs.unsubscribe();
                    if (roundCount - 1 !== 0) {
                        this.roundLeftSubject$.next(roundCount - 1);
                    }
                }
            });
    }

    ngOnDestroy(): void {
        if (this.workSubs) {
            this.workSubs.unsubscribe();
        }
        if (this.restSubs) {
            this.restSubs.unsubscribe();
        }
        if (this.pauseIntervalTimer$) {
            this.pauseIntervalTimer$.unsubscribe();
        }
        if (this.roundLeftSubject$) {
            this.roundLeftSubject$.unsubscribe();
        }
    }
}
