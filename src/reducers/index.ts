import { compose, combineReducers, ActionReducerMap } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as fromTopics from './topics.reducer';
import * as fromTopic from './topic.reducer';
import * as fromUser from './user.reducer';

export interface State {
    topics: fromTopics.State,
    topic: fromTopic.State,
    user: fromUser.State,
}


export const reducer: ActionReducerMap<State> = {
    topics: fromTopics.reducer,
    topic: fromTopic.reducer,
    user: fromUser.reducer,
}


export const getTopicsState = (state: State) => state.topics;
export const getTopics = createSelector(getTopicsState, fromTopics.getCurrentTopics);
export const getTopicsIndex = createSelector(getTopicsState, fromTopics.getCurrentTopicsIndex);
export const getTopicsPageSize = createSelector(getTopicsState, fromTopics.getPageSize);
export const getCurrentTabName = createSelector(getTopicsState, fromTopics.getCurrentTabName);
export const getTopicsIsFetching = createSelector(getTopicsState, fromTopics.getIsFetching);


// 这个跟上面不一样 少个s
export const getTopicState = (state: State) => state.topic;
export const getTopicIsFetching = createSelector(getTopicState, fromTopic.getTopicIsFetching);
export const getTopic = createSelector(getTopicState, fromTopic.getTopic);
export const getReplies = createSelector(getTopicState, fromTopic.getReplies);
export const getReplyError = createSelector(getTopicState, fromTopic.getReplyError);

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, fromUser.getUser);
export const isLogin = createSelector(getUserState, fromUser.isLogin);
