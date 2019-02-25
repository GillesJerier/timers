import {Component, OnInit} from '@angular/core';
import {Subject, timer} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'timers';
    countdown: number;
    workTime: number;
    restTime: number;
    capTime: number;
    round: number;
    work: number;
    rest: number;
    hiit = {
        rounds: 8,
        work: 20,
        rest: 10,
        roundsLeftSubject: new Subject<number>()
    };

    constructor() {
        this.capTime = 60;
        this.round = 1;
    }

    ngOnInit() {
        this.hiit.roundsLeftSubject.subscribe((rounds: number) => {
            this.workoutTimer(rounds);
        });
    }

    onCountDown() {
        const timerSubs = timer(500, 1000)
            .subscribe((value: number) => {
                this.countdown = this.capTime - value;
                if (this.countdown <= 0) {
                    timerSubs.unsubscribe();
                }
                console.log(this.countdown);
            });
    }

    onHiitCountDown() {
        if (this.hiit.rounds && this.hiit.work) {
            this.hiit.roundsLeftSubject.next(this.hiit.rounds);
        }
    }

    workoutTimer(roundCount: number) {
        const workSubs = timer(0, 1000)
            .subscribe((value: number) => {
                this.workTime = this.hiit.work - value;
                if (this.workTime <= 0) {
                    workSubs.unsubscribe();
                    this.restTimer(roundCount);
                }
            });
    }

    restTimer(roundCount: number) {
        const restSubs = timer(500, 1000)
            .subscribe((restValue: number) => {
                this.restTime = this.hiit.rest - restValue;
                if (this.restTime <= 0) {
                    restSubs.unsubscribe();
                    if (roundCount - 1 !== 0) {
                        this.hiit.roundsLeftSubject.next(roundCount - 1);
                    }
                }
            });
    }
}
