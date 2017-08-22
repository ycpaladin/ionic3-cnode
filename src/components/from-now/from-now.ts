import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
/**
 * Generated class for the FromNowComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'from-now',
    templateUrl: 'from-now.html'
})
export class FromNowComponent implements OnInit {



    @Input() dateTime: Date;

    dispayDate: string;

    constructor() {

    }

    ngOnInit(): void {
        this.dispayDate = moment(this.dateTime).locale('zh-cn').fromNow();
    }


}
