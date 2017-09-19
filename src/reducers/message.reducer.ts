import { Message } from '../models/message';
import * as msg from '../actions/message.action';
import * as user from '../actions/user.action';

export interface State {
    isFetching: boolean;
    message: string;
    hasRead: Message[],
    error: boolean;
    hasNotRead: Message[]
}


export const initialState: State = {
    isFetching: false,
    message: undefined,
    error: false,
    hasRead: [],
    hasNotRead: []
}


export function reducer(state: State = initialState, action: msg.Actions | user.Actions): State {
    switch (action.type) {
        case msg.LOAD_MESSAGE:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                message: undefined
            });
        case msg.LOAD_MESSAGE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                message: undefined,
                hasRead: action.payload.has_read_messages,
                hasNotRead: action.payload.hasnot_read_messages
            });
        case msg.LOAD_MESSAGE_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.payload
            });
        case user.USER_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                hasRead: [],
                hasNotRead: []
            });
        default:
            return state;
    }
}

export const getHasReadMessage = (state: State) => state.hasRead;
export const getHasNotReadMessage = (state: State) => state.hasNotRead;
export const getIsFetching = (state: State) => state.isFetching;
// export const get
