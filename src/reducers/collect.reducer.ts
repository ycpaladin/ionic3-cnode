import * as collect from '../actions/collect.action';
import * as topic from '../actions/topic.action';
import { Topic } from '../models/topic';

export interface State {
    isFetching: boolean;
    message: string;
    error: boolean;
    collect: Topic[],
    shouldReload: boolean,
}

const defaultState: State = {
    isFetching: false,
    message: undefined,
    error: false,
    collect: [],
    shouldReload: true
}

export function reducer(state: State = defaultState, action: collect.Actions | topic.Actions) {
    switch (action.type) {
        case topic.COLLECT_SUCCESS: // 收藏成功
        case topic.DECOLLECT_SUCCESS: // 取消收藏成功
            return Object.assign({}, state, {
                collect: [], // 清空
                shouldReload: true  // 需要重新加载
            });
        case collect.COLLECT_LOAD:
            return Object.assign({}, state, {
                isFetching: true,
                message: undefined,
                error: false
                // collect: []
            });
        case collect.COLLECT_LOAD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                collect: action.payload,
                shouldReload: false
            });
        case collect.COLLECT_LOAD_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.payload
            });
        default:
            return state;
    }
}

export const getCollect = (state: State) => state.collect;
export const getCollectIsFetching = (state: State) => state.isFetching;
export const getCollectError = (state: State) => state.error;
export const getCollectMessage = (state: State) => state.message;
export const getCollectShouldReload = (state: State) => state.shouldReload;

