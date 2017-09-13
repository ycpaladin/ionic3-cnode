import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { User } from '../models/user';
import * as fromRoot from '../reducers';
import * as user from '../actions/user.action';
import * as ud from '../actions/user-detials';

import { CnodeWebApiProvider, LoginResult, ErrorResult } from '../providers/cnode-web-api/cnode-web-api';
import { CnodeUserProvider } from '../providers/cnode-user/cnode-user';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private service: CnodeWebApiProvider,
        private userLocalProvide: CnodeUserProvider
        ) {

    }

    @Effect()
    userLogin$: Observable<Action> = this.actions$
        .ofType(user.USER_LOGIN)
        .map((action: user.UserLoginAction) => action.payload)
        .mergeMap(accessToken =>
            // 验证用户的accessToken
            this.service.login(accessToken)
                // .filter(t => t.success === true)
                .mergeMap(r => {
                    if (r.success === true) {
                        const { loginname, id, avatar_url } = (<LoginResult>r);
                        const u: User = { loginname, id, avatar_url, accessToken };
                        // 将用户对象写入到本地的IndexedDB中
                        return this.userLocalProvide.writeUserToLocal(u).map(result => {
                            if (result === true) {
                                // 写入成功之后，发送一个获取用户详细信息的请求
                                this.store$.dispatch(new ud.UserDetialLoadAction({ loginname, isSelf: true }));
                                return new user.UserLoginSuccessAction(u)
                            } else {
                                return new user.UserLoginFailAction('用户登陆出现错误.');
                            }
                        })
                    } else {
                        const { error_msg } = (<ErrorResult>r);// 来自服务端的消息
                        return of(new user.UserLoginFailAction(error_msg));
                    }
                })
                .catch(e => {
                    return of(new user.UserLoginFailAction('用户登陆出现异常.'));
                })
        );


    @Effect()
    userLogOut$: Observable<Action> = this.actions$
        .ofType(user.USER_LOGOUT)
        .withLatestFrom(this.store$.select(fromRoot.getUser))
        .mergeMap(([, { id }]) =>
            this.userLocalProvide.removeLocalUser(id).map(result => {
                if (result === true) {
                    return new user.UserLogoutSuccessAction();
                } else {
                    return new user.UserLogoutFailAction('退出登录出现错误');
                }
            }));
}
