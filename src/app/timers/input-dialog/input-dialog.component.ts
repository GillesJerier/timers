import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {fromEvent, Subscription} from "rxjs";

@Component({
    selector: 'app-input-dialog',
    templateUrl: './input-dialog.component.html',
    styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit, OnDestroy {
    selectedNumber: string = '';
    subscription: Subscription;

    constructor(@Inject(MAT_DIALOG_DATA) public type: any, private dialogRef: MatDialogRef<InputDialogComponent>) {
    }

    ngOnInit() {
        this.subscription = fromEvent(document, 'keypress')
            .subscribe((e: KeyboardEvent) => {
                e.preventDefault();
                if (e.code === 'Enter') {
                    this.onCloseDialog();
                } else {
                    const input = e.key;
                    const value = parseInt(input, 10);
                    if (input && !isNaN(value)) {
                        this.onAddNumber(value)
                    }
                }
            });
    }

    onAddNumber(input: number) {
        this.selectedNumber += input.toString();
    }

    onRemoveLastNumber() {
        this.selectedNumber = this.selectedNumber.slice(0, -1);
    }

    onCloseDialog() {
        this.dialogRef.close(this.selectedNumber);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
