import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as msg from '../../actions/message.action';

import { Message } from '../../models/message';

/**
 * Generated class for the CnodeMessageListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-message-list',
    templateUrl: 'cnode-message-list.html'
})
export class CnodeMessageListComponent {

    hasRead: Observable<Message[]>;
    hasNotRead: Observable<Message[]>;
    isFetching: Observable<boolean>;
    constructor(public store: Store<fromRoot.State>) {
        this.store.dispatch(new msg.LoadMessageAction());
        this.isFetching = this.store.select(fromRoot.getMsgIsFetching);
        this.hasRead = this.store.select(fromRoot.getHasReadMsg);
        this.hasNotRead = this.store.select(fromRoot.getHasNotReadMsg);
    }

}
