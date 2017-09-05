import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'

import { UserDetials } from '../../models/user-detials';
import * as ud from '../../actions/user-detials';

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


    @Input() loginname: string;
    user: Observable<UserDetials>;
    constructor(private store: Store<fromRoot.State>) {
        this.user = this.store.select(fromRoot.getUserDetials);
    }


    ngOnInit(): void {
        this.store.dispatch(new ud.UserDetialLoadAction(this.loginname));
    }

}
