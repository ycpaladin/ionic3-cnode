import { Action } from '@ngrx/store';
import { User } from '../models/user';


export const USER_LOGIN = '[User] Login';
export const USER_LOGIN_SUCCESS = '[User] Login Success';
export const USER_LOGIN_FAIL = '[User] Login Fail';

export const USER_LOGOUT = '[User] Logout';
export const USER_LOGOUT_SUCCESS = '[User] Logout Success';
export const USER_LOGOUT_FAIL = '[User] Logout Fail';

export class UserLogin implements Action {
    readonly type = USER_LOGIN;
    constructor(public payload: string) { } //accesstoken
}

export class UserLoginSuccess implements Action {
    readonly type = USER_LOGIN_SUCCESS;
    constructor(public payload: User) { }
}

export class UserLoginFail implements Action {
    readonly type = USER_LOGIN_FAIL;
    constructor(public payload: any) { }
}

export class UserLogout implements Action {
    readonly type = USER_LOGOUT;
    constructor(public payload: string) { } //accesstoken
}

export class UserLogoutSuccess implements Action {
    readonly type = USER_LOGOUT_SUCCESS;
    constructor(public payload: boolean) { }
}

export class UserLogoutFail implements Action {
    readonly type = USER_LOGOUT_FAIL;
    constructor(public payload: any) { }
}

export type Actions = UserLogin | UserLoginSuccess | UserLoginFail | UserLogout | UserLogoutSuccess | UserLogoutFail;
