import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-input-dialog',
    templateUrl: './input-dialog.component.html',
    styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {
    selectedNumber: string = '';

    constructor(@Inject(MAT_DIALOG_DATA) public type: any) {
    }

    ngOnInit() {
    }

    onAddNumber(input: number) {
        this.selectedNumber += input.toString();
    }

    onRemoveLastNumber() {
        this.selectedNumber = this.selectedNumber.slice(0, -1);
    }
}
