import { User } from '../models/user';

import * as user from '../actions/user.action';
import * as app from '../actions/app.action';

export interface State {
    isFetching: boolean;
    error: boolean;
    message: string;
    user: User;
}

const initialState: State = {
    isFetching: false,
    error: false,
    message: undefined,
    user: undefined
}


export const reducer = function (state: State = initialState, action: user.Actions | app.Actions): State {

    switch (action.type) {
        case app.APP_INIT:
            if (action.payload != undefined && action.payload != null) {
                return Object.assign({}, state, {
                    user: action.payload
                });
            }
        case user.USER_LOGIN:
            return Object.assign({}, state, { isFetching: true });
        case user.USER_LOGIN_SUCCESS:
            return Object.assign({}, state, { isFetching: false, user: action.payload })
        case user.USER_LOGIN_FAIL:
            return Object.assign({}, state, { isFetching: false, error: true, message: action.payload });
        // case user.USER_LOGOUT:
        // case user.USER_LOGOUT_SUCCESS:
        // case user.USER_LOGOUT_FAIL:
        default:
            return state;
    }
}


export const getUser = (state: State) => state.user;
export const getError = (state: State) => state.error;
export const getIsFetching = (state: State) => state.isFetching;
export const getErrorMsg = (state: State) => state.message;
export const isLogin = (state: State) => state.user !== undefined && state.user !== null;
