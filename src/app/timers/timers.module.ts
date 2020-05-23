import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntervalTrainingComponent} from "./interval-training/interval-training.component";
import {CountdownComponent} from "./countdown/countdown.component";
import {TimerPipe} from "./pipes/timer.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {TimerDialogComponent} from './timer-dialog/timer-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {IntervalTimerDialogComponent} from './interval-timer-dialog/interval-timer-dialog.component';
import {InputDialogComponent} from "./input-dialog/input-dialog.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        IntervalTrainingComponent,
        CountdownComponent,
        TimerPipe,
        TimerDialogComponent,
        IntervalTimerDialogComponent,
        InputDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
    ],
    exports: [
        CountdownComponent,
        IntervalTrainingComponent
    ],
    entryComponents: [
        TimerDialogComponent,
        IntervalTimerDialogComponent
    ]
})
export class TimersModule {
}
