import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
// import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
// import * as fromRoot from '../reducers';
import * as ud from '../actions/user-detials';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';


@Injectable()
export class UserDetialsEffects {

    constructor(private actions$: Actions, private service: CnodeWebApiProvider) {

    }


    @Effect() userDetial$: Observable<Action> = this.actions$
        .ofType(ud.LOAD_USER_DETIALS)
        .map((action: ud.UserDetialLoadAction) => action.payload)
        .mergeMap(({ loginname, isSelf }) =>
            this.service.getUserInfo(loginname)
                .map(r => {
                    if (r.success) {
                        if (isSelf) {
                            return new ud.UserDetialLoadSelfSuccessAction(r.data);
                        } else {
                            return new ud.UserDetialLoadSuccessAction(r.data)
                        }
                    }
                    else {
                        if (isSelf) {
                            return new ud.UserDetialLoadSelfFailAction('出现错误.');
                        } else {
                            return new ud.UserDetialLoadFailAction('出现错误.')
                        }
                    }
                })
                .catch(e => of(new ud.UserDetialLoadFailAction(e)))
        );
}
