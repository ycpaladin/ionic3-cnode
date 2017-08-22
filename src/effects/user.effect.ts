import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { User } from '../models/user';
import * as user from '../actions/user.action';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';


@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private service: CnodeWebApiProvider, private db: Database) {

    }


    @Effect()
    userLogin$: Observable<Action> = this.actions$
        .ofType(user.USER_LOGIN)
        .map((action: user.UserLogin) => action.payload)
        .mergeMap(accessToken =>
            this.service.login(accessToken)
                .mergeMap(u => this.db.insert('user', [u])
                    .map(() => new user.UserLoginSuccess(u))
                    .catch(e => of(new user.UserLoginFail(e)))
                )
        );

}
