import { Action } from '@ngrx/store';
import { User } from '../models/user';
export const APP_INIT = '[App] Initial';


export class AppInitialAction implements Action {

    readonly type = APP_INIT;
    constructor(public payload: User) { }
}

export type Actions = AppInitialAction;
