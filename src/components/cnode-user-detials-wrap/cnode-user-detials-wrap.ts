import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'

import { UserDetials } from '../../models/user-detials';
import * as ud from '../../actions/user-detials';

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


    @Input() loginname: string;
    @Input() isSelf: boolean = false;
    user: Observable<UserDetials>;
    constructor(private store: Store<fromRoot.State>) {

    }


    ngOnInit(): void {
        this.store.dispatch(new ud.UserDetialLoadAction({ loginname: this.loginname, isSelf: this.isSelf }));
        if (this.isSelf === true) {
            this.user = this.store.select(fromRoot.getCurrentUserDetials);
        } else {
            this.user = this.store.select(fromRoot.getUserDetials);
        }
    }

}
