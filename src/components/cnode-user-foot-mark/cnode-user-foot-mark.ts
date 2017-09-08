import { Component, Input } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

import { UserDetials } from '../../models/user-detials';

/**
 * Generated class for the CnodeUserFootMarkComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'cnode-user-foot-mark',
    templateUrl: 'cnode-user-foot-mark.html'
})
export class CnodeUserFootMarkComponent {

    @Input() ud: UserDetials;
    constructor() {

    }

}
