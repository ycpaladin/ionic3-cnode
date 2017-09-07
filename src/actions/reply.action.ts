import { Action } from '@ngrx/store';
import { Topic } from '../models/topic';

export const REPLY = '[Topic] Reply';
export const REPLY_SUCCESS = '[Topic] Reply Success';
export const REPLY_FAIL = '[Topic] Reply Fail';

export class ReplyAction implements Action {
    readonly type = REPLY;
    constructor(public payload: { topicId: string, content: string, replyId: string }) {

    }
}

export class ReplySuccessAction implements Action {
    readonly type = REPLY_SUCCESS;
    constructor(public payload: Topic) { }
}

export class ReplyFailAction implements Action {
    readonly type = REPLY_FAIL;
    constructor(public payload: string) {

    }
}

export type Actions = ReplyAction | ReplySuccessAction | ReplyFailAction;
