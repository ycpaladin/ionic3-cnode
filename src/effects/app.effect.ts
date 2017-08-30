import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import * as fromRoot from '../reducers'
import { User } from '../models/user';
import * as app from '../actions/app.action';


@Injectable()
export class AppEffect {

    constructor(private actions$: Actions, private store: Store<fromRoot.State>, private db: Database) {
        // this.store.
    }

    // @Effect()
    // init$: Observable<Action> = this.actions$
    //     .ofType('app.APP_INIT')
    //     .startWith(new app.AppInitialAction());
    @Effect() init$: Observable<Action> = defer(() => {
        return of(new app.AppInitialAction());
    });


    @Effect()
    init$$: Observable<Action> = this.actions$.ofType(app.APP_INIT)
        .switchMap(() =>
            this.db.query('user').map((u: User) => u).toArray()
                .map((users: User[]) => {
                    const x = new app.AppInitialSuccessAction({
                        id: '5816eed5b37ee8fb33978977',
                        loginname: 'ycpaladin',
                        avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
                        accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
                    });
                    return x;
                }));

    // defer(() => {
    //     return this.db.query('user').map((u: User) => u).toArray()
    //         .map((users: User[]) => {
    //             const x = new app.AppInitialSuccessAction({
    //                 id: '5816eed5b37ee8fb33978977',
    //                 loginname: 'ycpaladin',
    //                 avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
    //                 accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
    //             });
    //             return x;
    //         });
    // });

    // @Effect()
    // init$: Observable<Action> = defer(() => {
    //     return this.db.query('user').map((u: User) => u).toArray()
    //         .map((users: User[]) => {
    //             const x = new app.AppInitialAction({
    //                 id: '5816eed5b37ee8fb33978977',
    //                 loginname: 'ycpaladin',
    //                 avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
    //                 accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
    //             });
    //             return x;
    //         });
    // });

    // @Effect() init2$: Observable<Action> = this.actions$
    //     .ofType(app.APP_INIT)
    //     // .withLatestFrom(this.store)
    //     .map(() => {
    //         const x = new app.AppInitialActionSuccess({
    //             id: '5816eed5b37ee8fb33978977',
    //             loginname: 'ycpaladin',
    //             avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
    //             accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
    //         });
    //         return x;
    //     });


    // @Effect() init$: Observable<Action> = this.actions$.ofType(app.APP_INIT)
    //     .map((action: app.AppInitialAction) => action.payload)
    //     .mergeMap(() => {
    //         return this.db.query('user').map((u: User) => u).toArray()
    //             .map((users: User[]) => {
    //                 const x = new app.AppInitialAction({
    //                     id: '5816eed5b37ee8fb33978977',
    //                     loginname: 'ycpaladin',
    //                     avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
    //                     accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
    //                 });
    //                 return x;
    //             });
    //     });
}