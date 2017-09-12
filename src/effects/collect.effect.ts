import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/withLatestFrom'

import * as fromRoot from '../reducers';
import * as collect from '../actions/collect.action';


import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';

@Injectable()
export class CollectEffects {
    constructor(public store$: Store<fromRoot.State>, public actions$: Actions, public service$: CnodeWebApiProvider) {

    }

    @Effect()
    load$: Observable<Action> = this.actions$.ofType(collect.COLLECT_LOAD)
        .withLatestFrom(this.store$.select(fromRoot.getUser))
        .mergeMap(([, { loginname }]) =>
            this.service$.getUserCollect(loginname)
                .map(({ success, data }) =>
                    (success === true) ?
                        new collect.CollectLoadSuccessAction(data) :
                        new collect.CollectLoadFailAction('获取用户收藏出现错误。')
                ))
        .catch(e => of(new collect.CollectLoadFailAction('获取用户收藏出现异常。')))


}