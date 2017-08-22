import { Action } from '@ngrx/store';
import { Topic } from '../models/topic';


export const LOAD = '[Topics] Load';
export const RE_LOAD = '[Topics] ReLoad';
export const LOAD_SUCCESS = '[Topics] Load Success';
export const LOAD_FAIL = '[Topics] Load Fail';

export const CHANGETAB = '[Topics] ChangeTab'


export class LoadAction implements Action {
    readonly type = LOAD;
    constructor(public payload: { tabName: string, pageIndex: number }) { }
}

export class ReloadAction implements Action {
    readonly type = RE_LOAD;
    constructor(public payload: { tabName: string, pageIndex: number }) { }
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: { tabName: string, topics: Topic[], pageIndex: number }) { }
}

export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) { }
}

export class ChangeTabAction implements Action {
    readonly type = CHANGETAB;
    constructor(public payload: string) { }
}


export type Actions = LoadAction | ReloadAction | LoadSuccessAction | LoadFailAction | ChangeTabAction;