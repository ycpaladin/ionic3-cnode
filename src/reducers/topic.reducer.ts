import { Topic, defaultTopic } from '../models/topic';

import * as topic from '../actions/topic.action';
import * as reply from '../actions/reply.action';

/**
 * 主题状态
 */
export interface State {
    /**
     * 是否正在请求
     */
    isFetching: boolean;
    error: false,
    message: string;
    topic: Topic
}


export const initialState: State = {
    isFetching: false,
    error: false,
    message: '',
    topic: defaultTopic
}


export function reducer(state = initialState, action: topic.Actions | reply.Actions): State {

    switch (action.type) {
        case reply.REPLY:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                message: '',
            });
        case reply.REPLY_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                message: '',
                topic: {
                    ...state.topic,
                    replies: [
                        ...action.payload.replies
                    ]
                }
            });
        case reply.REPLY_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
                message: action.payload
            });
        case topic.LOAD:
            return Object.assign({}, state, {
                isFetching: true,
                error: false,
                topic: defaultTopic,
                message: ''
            })
        case topic.LOAD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                topic: action.payload
            });
        case topic.UPREPLEY_SUCCESS:
            // 在此处理赞或者取消赞
            const r = state.topic.replies.find(t => t.id === action.payload.replyId);
            r.is_uped = action.payload.upType === 'up';
            return state;
        case topic.COLLECT_SUCCESS:
        case topic.DECOLLECT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: false,
                message: '',
                topic: {
                    ...state.topic,
                    is_collect: !state.topic.is_collect
                }
            });
        case topic.COLLECT_FAIL:
        case topic.DECOLLECT_FAIL:
        case topic.LOAD_FAIL:
        case topic.COLLECT:
        case topic.DECOLLECT:
        default:
            return state;
    }
}


export const getTopicIsFetching = (state: State) => state.isFetching;
export const getTopic = (state: State) => state.topic;

export const getReplies = (state: State) => state.topic.replies;
export const getReplyError = (state: State) => state.error;
export const getTopicMessage = (state: State) => state.message;