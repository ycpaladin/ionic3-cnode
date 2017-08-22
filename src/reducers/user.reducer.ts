import { User } from '../models/user';

import * as user from '../actions/user.action';

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
    user: {
        id: undefined,
        loginname: undefined,
        avatar_url: undefined,
        accessToken: undefined
    }
}


export const reducer = function (state: State = initialState, action: user.Actions): State {

    switch (action.type) {
        case user.USER_LOGIN:
            return Object.assign({}, state, { isFetching: true });
        case user.USER_LOGIN_SUCCESS:
            return Object.assign({}, state, { isFetching: false, user: action.payload })
        case user.USER_LOGIN_FAIL:
            return Object.assign({}, state, { isFetching: false, error: true, message: action.payload });
        // case user.USER_LOGOUT:
        // case user.USER_LOGOUT_SUCCESS:
        // case user.USER_LOGOUT_FAIL:
        case user.INITIAL_USER_STATE:
        default:
            return state;
    }
}


export const getUser = (state: State) => state.user;
export const getError = (state: State) => state.error;
export const getIsFetching = (state: State) => state.isFetching;
export const getErrorMsg = (state: State) => state.message;

