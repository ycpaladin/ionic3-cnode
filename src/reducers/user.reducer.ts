import { User } from '../models/user';

import * as user from '../actions/user.action';
import * as app from '../actions/app.action';

export interface State {
    isFetching: boolean;
    checked: boolean;
    error: boolean;
    message: string;
    user: User;
}

const initialState: State = {
    isFetching: false,
    checked: false,
    error: false,
    message: undefined,
    user: undefined
}


export function reducer(state: State = initialState, action: user.Actions | app.Actions): State {
    switch (action.type) {
        case app.APP_INIT_SUCCESS:

            if (action.payload != undefined && action.payload != null) {
                return Object.assign({}, state, {
                    checked: true,
                    user: action.payload
                });
            } else {
                return state;
            }
        case user.USER_LOGIN:
            return Object.assign({}, state, { isFetching: true, error: false, message: undefined });
        case user.USER_LOGIN_SUCCESS:
            return Object.assign({}, state, { isFetching: false, user: action.payload })
        case user.USER_LOGIN_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.payload
            });
        case user.USER_LOGOUT_SUCCESS:
            return Object.assign({}, state, { isFetching: false, user: undefined })
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
export const checkedUser = (state: State) => state.checked;
export const getAccessToken = (state: State) => state.user && state.user.accessToken;
export const getLoginname = (state: State) => state.user && state.user.loginname;
