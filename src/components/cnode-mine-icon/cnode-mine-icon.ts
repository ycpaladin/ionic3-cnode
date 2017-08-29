import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
/**
 * Generated class for the CnodeMineIconComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-mine-icon',
    templateUrl: 'cnode-mine-icon.html'
})
export class CnodeMineIconComponent implements OnInit {

    @Input() user: User;

    constructor() {
        
    }

    ngOnInit(): void {
        console.log('====>', this.user)
    }

}
