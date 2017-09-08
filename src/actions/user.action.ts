import { Action } from '@ngrx/store';
import { User } from '../models/user';


export const USER_LOGIN = '[User] Login';
export const USER_LOGIN_SUCCESS = '[User] Login Success';
export const USER_LOGIN_FAIL = '[User] Login Fail';

export const USER_LOGOUT = '[User] Logout';
export const USER_LOGOUT_SUCCESS = '[User] Logout Success';
export const USER_LOGOUT_FAIL = '[User] Logout Fail';

export class UserLoginAction implements Action {
    readonly type = USER_LOGIN;
    constructor(public payload: string) { } //accesstoken
}

export class UserLoginSuccessAction implements Action {
    readonly type = USER_LOGIN_SUCCESS;
    constructor(public payload: User) { }
}

export class UserLoginFailAction implements Action {
    readonly type = USER_LOGIN_FAIL;
    constructor(public payload: any) { }
}

export class UserLogoutAction implements Action {
    readonly type = USER_LOGOUT;
    constructor() { } //accesstoken
}

export class UserLogoutSuccessAction implements Action {
    readonly type = USER_LOGOUT_SUCCESS;
    constructor() { }
}

export class UserLogoutFailAction implements Action {
    readonly type = USER_LOGOUT_FAIL;
    constructor(public payload: string) { }
}

export type Actions =
    UserLoginAction |
    UserLoginSuccessAction |
    UserLoginFailAction |
    UserLogoutAction |
    UserLogoutSuccessAction |
    UserLogoutFailAction;
