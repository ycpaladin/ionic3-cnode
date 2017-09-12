import { ActionReducerMap } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as fromTopics from './topics.reducer';
import * as fromTopic from './topic.reducer';
import * as fromUser from './user.reducer';
import * as fromUd from './user-detials.reducer';
import * as fromMsg from './message.reducer';
import * as fromCollect from './collect.reducer';

export interface State {
    topics: fromTopics.State,
    topic: fromTopic.State,
    user: fromUser.State,
    ud: fromUd.State,
    msg: fromMsg.State,
    collect: fromCollect.State,
}

export const reducer: ActionReducerMap<State> = {
    topics: fromTopics.reducer,
    topic: fromTopic.reducer,
    user: fromUser.reducer,
    ud: fromUd.reducer,
    msg: fromMsg.reducer,
    collect: fromCollect.reducer,
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
export const getTopicMessage = createSelector(getTopicState, fromTopic.getTopicMessage);

export const getUserState = (state: State) => state.user;
export const getUser = createSelector(getUserState, fromUser.getUser);
export const isLogin = createSelector(getUserState, fromUser.isLogin);
export const checkedUser = createSelector(getUserState, fromUser.checkedUser);
export const getAccessToken = createSelector(getUserState, fromUser.getAccessToken);
export const getUserMessage = createSelector(getUserState, fromUser.getErrorMsg);
export const getUserError = createSelector(getUserState, fromUser.getError);

// 用户详情
export const getUserDetialsState = (state: State) => state.ud;
export const getUserDetials = createSelector(getUserDetialsState, fromUd.getUserDetials);
export const getCurrentUserDetials = createSelector(getUserDetialsState, fromUd.getCurrentUserDetials);
export const getUserDetialsFetching = createSelector(getUserDetialsState, fromUd.getIsFetching);
export const getUserDetialsMessage = createSelector(getUserDetialsState, fromUd.getErrorMsg);
export const getUserDetialsError = createSelector(getUserDetialsState, fromUd.getError);

// 当前登录用户的消息
export const getMessageState = (state: State) => state.msg;
export const getHasReadMsg = createSelector(getMessageState, fromMsg.getHasReadMessage);
export const getHasNotReadMsg = createSelector(getMessageState, fromMsg.getHasNotReadMessage);
export const getMsgIsFetching = createSelector(getMessageState, fromMsg.getIsFetching);

// 用户收藏
export const getCollectState = (state: State) => state.collect;
export const getCollect = createSelector(getCollectState, fromCollect.getCollect);
export const getCollectMsg = createSelector(getCollectState, fromCollect.getCollectMessage);
export const getCollectIsFetching = createSelector(getCollectState, fromCollect.getCollectIsFetching);
export const getCollectError = createSelector(getCollectState, fromCollect.getCollectError);
export const getCollectShouldReload = createSelector(getCollectState, fromCollect.getCollectShouldReload);
