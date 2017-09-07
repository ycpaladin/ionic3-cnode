import { Component, OnInit, Input } from '@angular/core';
import { UserDetials } from '../../models/user-detials';
import moment from 'moment';

/**
 * Generated class for the CnodeUserDetialsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-user-detials',
    templateUrl: 'cnode-user-detials.html'
})
export class CnodeUserDetialsComponent implements OnInit {

    @Input() user: UserDetials;

    constructor() {

    }

    ngOnInit(): void {

    }

    format(datetime: Date) {
        return moment(datetime).locale('zh-cn').format('ll');
    }

}
