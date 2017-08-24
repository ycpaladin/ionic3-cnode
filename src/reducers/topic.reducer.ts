import { Topic } from '../models/topic';

import * as topic from '../actions/topic.action';

export interface State {
    isFetching: boolean;
    message: string;
    topic: Topic
}


export const initialState: State = {
    isFetching: false,
    message: '',
    topic: {
        id: '',
        author_id: '',
        tab: '',
        content: '',
        // 文章标题
        title: '',
        last_reply_at: new Date(),
        good: false,
        top: false,
        reply_count: 0,
        visit_count: 0,
        create_at: new Date(),
        author: {
            loginname: '',
            avatar_url: '',
        },
        replies: [],
        is_collect: false
    }
}


export function reducer(state = initialState, action: topic.Actions): State {

    switch (action.type) {
        case topic.LOAD:
            return Object.assign({}, state, {
                isFetching: true,
                message: ''
            })
        case topic.LOAD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
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
