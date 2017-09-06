import { Action } from '@ngrx/store';
import { Data } from '../models/message';

export const LOAD_MESSAGE = '[Message] Load';
export const LOAD_MESSAGE_SUCCESS = '[Message] Load Success';
export const LOAD_MESSAGE_FAIL = '[Message] Load Fail';

export class LoadMessageAction implements Action {
    readonly type = LOAD_MESSAGE;
    constructor() { }
}

export class LoadMessageSuccessAction implements Action {
    readonly type = LOAD_MESSAGE_SUCCESS;
    constructor(public payload: Data) { }
}

export class LoadMessageFailAction implements Action {
    readonly type = LOAD_MESSAGE_FAIL;
    constructor(public payload: string) { }
}


export type Actions = LoadMessageAction | LoadMessageSuccessAction | LoadMessageFailAction;


