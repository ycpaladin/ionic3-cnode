
import { Topic } from '../models/topic';

import * as topic from '../actions/topics.action';

export interface State {
    isFetching: boolean;
    tabName: string;
    pageSize: number;
    topics: {
        [tabName: string]: {
            scrollHeight: number;
            pageIndex: number;
            data: Topic[]
        }
    }
}


export const initialState: State = {
    isFetching: false,
    tabName: 'dev',
    pageSize: 15,
    topics: {
        all: {
            pageIndex: 0,
            scrollHeight: 0,
            data: []
        },
        good: {
            pageIndex: 0,
            scrollHeight: 0,
            data: []
        },
        share: {
            pageIndex: 0,
            scrollHeight: 0,
            data: []
        },
        ask: {
            pageIndex: 0,
            scrollHeight: 0,
            data: []
        },
        job: {
            pageIndex: 0,
            scrollHeight: 0,
            data: []
        },
        dev: {
            pageIndex: 0,
            scrollHeight: 0,
            data: []
        }
    }
}


export function reducer(state = initialState, action: topic.Actions): State {

    switch (action.type) {
        case topic.CHANGETAB:
            return Object.assign({}, state, { tabName: action.payload });
        case topic.LOAD:
            // const { tabName, pageIndex} = action.payload;
            return Object.assign({}, state, {
                isFetching: true,
                tabName: action.payload.tabName
            });

        case topic.RE_LOAD:
            return Object.assign({}, state, {
                isFetching: true,
                tabName: action.payload.tabName,
                topics: Object.assign({}, state.topics, {
                    [action.payload.tabName]: {
                        pageIndex: 1,
                        data: []
                    }
                })
            });
        case topic.LOAD_SUCCESS:
            const { tabName, pageIndex, topics } = action.payload;
            return Object.assign({}, state, {
                isFetching: false,
                tabName,
                topics: Object.assign({}, state.topics, {
                    [tabName]: {
                        pageIndex: pageIndex,
                        data: [...state.topics[tabName].data, ...topics]
                    }
                })
            });
        case topic.LOAD_FAIL:
        default:
            return state;
    }
}


export const getCurrentTabName = (state: State) => state.tabName;
export const getPageSize = (state: State) => state.pageSize;
export const getIsFetching = (state: State) => state.isFetching;

export const getCurrentTopics = (state: State) => state.topics[state.tabName].data;
export const getCurrentTopicsIndex = (state: State) => state.topics[state.tabName].pageIndex;