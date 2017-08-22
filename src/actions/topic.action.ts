import { Action } from '@ngrx/store';
import { Topic } from '../models/topic';


export const LOAD = '[Topic] Load';
export const LOAD_SUCCESS = '[Topic] Load Success';
export const LOAD_FAIL = '[Topic] Load Fail';

export const UPREPLEY = '[Topic] Up Reply';
export const UPREPLEY_SUCCESS = '[Topic] Up Reply Success';
export const UPREPLEY_FAIL = '[Topic] Up Reply Reply';

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
    constructor(public payload: { id: string, upAction: boolean }) { }
}

export class UpReplySuccessAction implements Action {
    readonly type = UPREPLEY_SUCCESS;
    constructor(public payload: string) { }
}

export class UpReplyFailAction implements Action {
    readonly type = UPREPLEY_FAIL;
    constructor(public payload: any) { }
}


export type Actions = LoadAction | LoadSuccessAction | LoadFailAction | UpReplyAction | UpReplySuccessAction | UpReplyFailAction;
