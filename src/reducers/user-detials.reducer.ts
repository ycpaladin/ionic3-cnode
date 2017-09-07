import { UserDetials, defaultObject } from '../models/user-detials';
import * as ud from '../actions/user-detials';

export interface State {
    isFetching: boolean;
    error: boolean;
    message: string;
    detials: UserDetials,
    currentUserDetials: UserDetials
}

const intitalState: State = {
    isFetching: false,
    error: false,
    message: undefined,
    detials: defaultObject,
    currentUserDetials: defaultObject
}


export const reducer = (state: State = intitalState, action: ud.Actions): State => {

    switch (action.type) {
        case ud.LOAD_USER_DETIALS:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                message: undefined,
                // detials: defaultObject
            });
        case ud.LOAD_USER_DETIALS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                detials: action.payload
            });
        case ud.LOAD_USER_DETIALS_SELF_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                currentUserDetials: action.payload
            });
        case ud.LOAD_USER_DETIALS_FAIL:
        case ud.LOAD_USER_DETIALS_SELF_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.payload
            });
        default:
            return state;
    }
}


export const getUserDetials = (state: State) => state.detials;
export const getCurrentUserDetials = (state: State) => state.currentUserDetials;
export const getError = (state: State) => state.error;
export const getIsFetching = (state: State) => state.isFetching;
export const getErrorMsg = (state: State) => state.message;
