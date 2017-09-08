import { Component, Input, OnInit } from '@angular/core';

import { UserDetials } from '../../models/user-detials';

/**
 * Generated class for the CnodeUserDetialsWrapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-user-detials-wrap',
    templateUrl: 'cnode-user-detials-wrap.html'
})
export class CnodeUserDetialsWrapComponent implements OnInit {


    @Input() isSelf: boolean = false;
    @Input() ud: UserDetials;
    constructor() {

    }


    ngOnInit(): void {
    }

}
