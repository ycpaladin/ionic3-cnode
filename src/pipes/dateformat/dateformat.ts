import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
/**
 * Generated class for the DateformatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'dateformat',
})
export class DateformatPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: Date, ...args) {
        return moment(value).locale('zh-cn').fromNow();
    }
}
