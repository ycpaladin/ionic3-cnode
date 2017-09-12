import { Action } from '@ngrx/store';
import { Topic } from '../models/topic';

export const COLLECT_LOAD = '[Collect] Load';
export const COLLECT_LOAD_SUCCESS = '[Collect] Load Success';
export const COLLECT_LOAD_FAIL = '[Collect] Load Fail';

export class CollectLoadAction implements Action {

    readonly type = COLLECT_LOAD;
    constructor() { }
}

export class CollectLoadSuccessAction implements Action {
    readonly type = COLLECT_LOAD_SUCCESS;
    constructor(public payload: Topic[]) {

    }
}

export class CollectLoadFailAction implements Action {
    readonly type = COLLECT_LOAD_FAIL;
    constructor(public payload: string) {

    }
}

export type Actions = CollectLoadAction | CollectLoadSuccessAction | CollectLoadFailAction;

