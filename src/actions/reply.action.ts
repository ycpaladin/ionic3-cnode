import { Action } from '@ngrx/store';


export const REPLY = '[Topic] Reply';
export const REPLY_SUCCESS = '[Topic] Reply Success';
export const REPLY_FAIL = '[Topic] Reply Fail';

export class ReplyAction implements Action {
    readonly type = REPLY;
    constructor(public payload: { accessToken: string, topicId: string, content: string, replyId: string }) {

    }
}

export class ReplySuccessAction implements Action {
    readonly type = REPLY_SUCCESS;
    constructor(public payload: {}) { }
}

export class ReplyFailAction implements Action {
    readonly type = REPLY_FAIL;
    constructor(public payload: any) {

    }
}

export type Actions = ReplyAction | ReplySuccessAction | ReplyFailAction;
