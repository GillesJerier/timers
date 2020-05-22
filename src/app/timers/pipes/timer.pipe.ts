import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timer'
})
export class TimerPipe implements PipeTransform {

    transform(value: any): any {
        return ('0' + value).slice(-2);
    }

}
