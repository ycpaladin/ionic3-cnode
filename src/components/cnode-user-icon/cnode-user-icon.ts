import { Component, Input } from '@angular/core';

/**
 * Generated class for the CnodeUserIconComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-user-icon',
    templateUrl: 'cnode-user-icon.html'
})
export class CnodeUserIconComponent {

    @Input() imgUrl: string;

    constructor() {

    }

}
