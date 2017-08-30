import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const APP_INIT = '[App] Initial';

export const APP_INIT_SUCCESS = '[App] Initial Success';

export class AppInitialAction implements Action{
    readonly type = APP_INIT;
    constructor() { }
}

export class AppInitialSuccessAction implements Action {
    readonly type = APP_INIT_SUCCESS;
    constructor(public payload: User) { }
}

export type Actions = AppInitialAction | AppInitialSuccessAction;
