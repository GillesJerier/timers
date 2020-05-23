import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {InputDialogComponent} from "./input-dialog/input-dialog.component";
import {BehaviorSubject, timer} from "rxjs";
import {filter, take, withLatestFrom} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class TimersService {
    readonly _timersType = [
        {type: 'COUNTDOWN', label: 'Countdown'},
        {type: 'INTERVAL', label: 'Interval Training'},
        {type: 'EMOM', label: 'Every Minute On the Minute (EMOM)'}
    ];
    readonly _inputType = {
        hours: 'HOURS',
        minutes: 'MINUTES',
        seconds: 'SECONDS',
        number: 'NUMBER',
        rounds: 'ROUNDS'
    }

    get timersType() {
        return this._timersType
    }

    get inputType() {
        return this._inputType;
    }

    constructor(private dialog: MatDialog) {
    }

    openInputDialog(type) {
        return this.dialog.open(InputDialogComponent, {data: type});
    }

    getPausableTimer(paused: BehaviorSubject<boolean>, capTime: number) {
        return timer(1000, 1000)
            .pipe(
                withLatestFrom(paused),
                filter(([value, paused]) => !paused),
                take(capTime)
            );
    }

    playBeep(beep) {
        if (beep && beep.nativeElement) {
            beep.nativeElement.play();
        }
    }
}
