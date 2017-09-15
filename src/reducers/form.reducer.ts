
import { } from '@ngrx/store';

import * as topic from '../actions/topic.action';

export interface State {
    error?: boolean;
    message: string;
}

const initialState: State = {
    error: undefined,
    message: undefined
}


export function reducer(state: State = initialState, action: topic.Actions): State {
    switch (action.type) {
        case topic.ADD_TOPIC:
        case topic.EDIT_TOPIC:
            return Object.assign({}, state, { error: undefined, message: undefined });
        case topic.ADD_TOPIC_SUCCESS:
        case topic.EDIT_TOPIC_SUCCESS:
            return Object.assign({}, state, { error: false, message: '操作成功.' });
        case topic.ADD_TOPIC_FAIL:
        case topic.EDIT_TOPIC_FAIL:
            return Object.assign({}, state, { error: true, message: action.payload });

        case topic.LEAVE_ADD_PAGE:
        case topic.LEAVE_EDIT_PAGE:
            return Object.assign({}, state, { error: undefined, message: undefined })
        default:
            return state;
    }
}

export const getError = (state: State) => state.error;
export const getMessage = (state: State) => state.message;
