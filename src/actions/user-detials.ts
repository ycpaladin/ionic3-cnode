import { Action } from '@ngrx/store';
import { UserDetials } from '../models/user-detials';

export const LOAD_USER_DETIALS = '[User Detials] Load';
export const LOAD_USER_DETIALS_SUCCESS = '[User Detials] Load Success';
export const LOAD_USER_DETIALS_FAIL = '[User Detials] Load Fail';


export class UserDetialLoadAction implements Action {
    readonly type = LOAD_USER_DETIALS;
    constructor(public payload: string) {

    }
}

export class UserDetialLoadSuccessAction implements Action {
    readonly type = LOAD_USER_DETIALS_SUCCESS;
    constructor(public payload: UserDetials) {

    }
}

export class UserDetialLoadFailAction implements Action {
    readonly type = LOAD_USER_DETIALS_FAIL;
    constructor(public payload: string) {

    }
}


export type Actions =
    UserDetialLoadAction |
    UserDetialLoadSuccessAction |
    UserDetialLoadFailAction;

