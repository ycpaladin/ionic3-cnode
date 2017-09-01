import { UserDetials } from '../models/user-detials';
import * as ud from '../actions/user-detials';

export interface State {
    isFetching: boolean;
    error: boolean;
    message: string;
    // loginname: string;
    detials: UserDetials
}

const intitalState: State = {
    isFetching: false,
    error: false,
    // loginname: undefined,
    message: undefined,
    detials: undefined
}


export const reducer = (state: State = intitalState, action: ud.Actions): State => {

    switch (action.type) {
        case ud.LOAD_USER_DETIALS:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                // loginname: action.payload,
                message: undefined,
                detials: undefined
            });
        case ud.LOAD_USER_DETIALS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                // loginname: action.
                detials: action.payload
            });
        case ud.LOAD_USER_DETIALS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.payload
            })
        default:
            return state;
    }
}


export const getUserDetials = (state: State) => state.detials;
export const getError = (state: State) => state.error;
export const getIsFetching = (state: State) => state.isFetching;
export const getErrorMsg = (state: State) => state.message;
