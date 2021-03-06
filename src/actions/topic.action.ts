import { Action } from '@ngrx/store';
import { Topic, TopicFromModel } from '../models/topic';


export const LOAD = '[Topic] Load';
export const LOAD_SUCCESS = '[Topic] Load Success';
export const LOAD_FAIL = '[Topic] Load Fail';

export const UPREPLEY = '[Topic] Up Reply';
export const UPREPLEY_SUCCESS = '[Topic] Up Reply Success';
export const UPREPLEY_FAIL = '[Topic] Up Reply Reply';


export const COLLECT = '[Topic] Collect';
export const COLLECT_SUCCESS = '[Topic] Collect Success';
export const COLLECT_FAIL = '[Topic] Collect Fail'

export const DECOLLECT = '[Topic] DeCollect';
export const DECOLLECT_SUCCESS = '[Topic] DeCollect Success';
export const DECOLLECT_FAIL = '[Topic] DeCollect Fail';


export const ADD_TOPIC = '[Topic] Add';
export const ADD_TOPIC_SUCCESS = '[Topic] Add Success';
export const ADD_TOPIC_FAIL = '[Topic] Add Fail';

export const EDIT_TOPIC = '[Topic] Edit';
export const EDIT_TOPIC_SUCCESS = '[Topic] Edit Success';
export const EDIT_TOPIC_FAIL = '[Topic] Edit Fail';

export const LEAVE_ADD_PAGE = '[Topic] Levae Add Page';
export const LEAVE_EDIT_PAGE = '[Topic] Levae Edit Page';

export class LoadAction implements Action {
    readonly type = LOAD;
    constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: Topic) { }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) { }
}

export class UpReplyAction implements Action {
    readonly type = UPREPLEY;
    constructor(public payload: string) { }
}

export class UpReplySuccessAction implements Action {
    readonly type = UPREPLEY_SUCCESS;
    constructor(public payload: { replyId: string, upType: string }) { }
}

export class UpReplyFailAction implements Action {
    readonly type = UPREPLEY_FAIL;
    constructor(public payload: any) { }
}

export class CollectAction implements Action {
    readonly type = COLLECT;
    constructor(public payload: string) { }
}

export class CollectSuccessAction implements Action {
    readonly type = COLLECT_SUCCESS;
    constructor() { }
}

export class CollectFailAction implements Action {
    readonly type = COLLECT_FAIL
    constructor(public payload: string) { }
}

export class DeCollectAction implements Action {
    readonly type = DECOLLECT;
    constructor(public payload: string) { }
}

export class DeCollectSuccessAction implements Action {
    readonly type = DECOLLECT_SUCCESS;
    constructor() { }
}

export class DeCollectFailAction implements Action {
    readonly type = DECOLLECT_FAIL
    constructor(public payload: string) { }
}


export class TopicAddAction implements Action {
    readonly type = ADD_TOPIC;
    constructor(public payload: TopicFromModel) { }
}

export class TopicAddSuccessAction implements Action {
    readonly type = ADD_TOPIC_SUCCESS;
    constructor() { }
}

export class TopicAddFailAction implements Action {
    readonly type = ADD_TOPIC_FAIL;
    constructor(public payload: string) { }
}

export class TopicEditAction implements Action {
    readonly type = EDIT_TOPIC;
    constructor(public payload: TopicFromModel) { }
}

export class TopicEditSuccessAction implements Action {
    readonly type = EDIT_TOPIC_SUCCESS;
    constructor() { }
}

export class TopicEditFailAction implements Action {
    readonly type = EDIT_TOPIC_FAIL;
    constructor(public payload: string) { }
}

export class LeaveAddPageAction implements Action {
    readonly type = LEAVE_ADD_PAGE;
}
export class LeaveEditPageAction implements Action {
    readonly type = LEAVE_EDIT_PAGE;
}

export type Actions =
    LoadAction | LoadSuccessAction | LoadFailAction |
    UpReplyAction | UpReplySuccessAction | UpReplyFailAction |
    CollectAction | CollectSuccessAction | CollectFailAction |
    DeCollectAction | DeCollectSuccessAction | DeCollectFailAction |
    TopicAddAction | TopicAddSuccessAction | TopicAddFailAction |
    TopicEditAction | TopicEditSuccessAction | TopicEditFailAction |
    LeaveAddPageAction | LeaveEditPageAction;
