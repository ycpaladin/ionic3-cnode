import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { User } from '../models/user';
import * as user from '../actions/user.action';


@Injectable()
export class AppEffect {

    constructor(private actions$: Actions, private db: Database) { }

    @Effect()
    init$: Observable<Action> = defer(() => {
        return this.db.query('user').map((u: User) => u).toArray()
            .map((users: User[]) => {
                const x = new user.UserLoginSuccess({
                    id: '5816eed5b37ee8fb33978977',
                    loginname: 'ycpaladin',
                    avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
                    accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
                });
                return x;
            });
    });
}