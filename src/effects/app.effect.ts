import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import * as app from '../actions/app.action';

import { CnodeUserProvider } from '../providers/cnode-user/cnode-user';


@Injectable()
export class AppEffect {

    constructor(private actions$: Actions, private provider: CnodeUserProvider) { }

    @Effect()
    init$$: Observable<Action> = this.actions$.ofType(app.APP_INIT)
        .switchMap(() =>
            this.provider.getLocalUser().map(user => new app.AppInitialSuccessAction(user)));

    @Effect() init$ = defer(() => {
        return of(new app.AppInitialAction());
    });


}