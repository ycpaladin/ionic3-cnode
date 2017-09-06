import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/withLatestFrom'

import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';
import * as msg from '../actions/message.action';
import * as fromRoot from '../reducers'

@Injectable()
export class MessageEffects {

    constructor(private actions$: Actions, private provide$: CnodeWebApiProvider, private store$: Store<fromRoot.State>) {

    }

    @Effect()
    message$: Observable<Action> = this.actions$.ofType(msg.LOAD_MESSAGE)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([, acccessToken]) => this.provide$.getMessages(acccessToken).map(result => {
            if (result.success) {
                return new msg.LoadMessageSuccessAction(result.data);
            } else {
                return new msg.LoadMessageFailAction('加载用户消息出现错误');
            }
        }))
        .catch(e => of(new msg.LoadMessageFailAction('加载用户消息出现异常')));
}