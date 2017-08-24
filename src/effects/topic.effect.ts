
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/mergeMap';

// import { empty } from 'rxjs/observable/empty';
// import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { User } from '../models/user';

import * as topic from '../actions/topics.action';

import * as t from '../actions/topic.action';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';

@Injectable()
export class TopicEffects {
    constructor(private actions$: Actions, private service: CnodeWebApiProvider, private db: Database) { }

    @Effect()
    loadTopics$: Observable<Action> = this.actions$
        .ofType(topic.LOAD, topic.RE_LOAD)
        .map(toPayload)
        .switchMap(({ tabName, pageIndex }) => {
            return this.service.getTopics(tabName, pageIndex, 15, false)
                .map(topics => new topic.LoadSuccessAction({ tabName, topics, pageIndex }))
                .catch(() => of(new topic.LoadFailAction('')))
        });

    @Effect()
    loadTopicById$: Observable<Action> = this.actions$.ofType(t.LOAD)
        .map(toPayload)
        .switchMap(({ topicId, accessToken }) => {
            return this.service.getTopicById(topicId, accessToken).map(topic => new t.LoadSuccessAction(topic))
                .catch(() => of(new t.LoadFailAction('')));
        });


    @Effect()
    upReply$: Observable<Action> = this.actions$.ofType(t.UPREPLEY).map((action: t.UpReplyAction) => action.payload)
        .mergeMap((payload) => {
            return this.service.upReply(payload.accessToken, payload.replyId)
                .map(r => new t.UpReplySuccessAction(r))
                .catch(e => of(new t.UpReplyFailAction(e)))
        });


    @Effect()
    collect$: Observable<Action> = this.actions$
        .ofType(t.COLLECT)
        .map((action: t.CollectAction) => action.payload)
        .mergeMap(({ accessToken, topic_id }) =>
            this.service.collect(accessToken, topic_id)
                .map(r => new t.CollectSuccessAction())
                .catch(e => of(new t.CollectFailAction('收藏主题失败.')))
        );

    @Effect()
    deCollect$: Observable<Action> = this.actions$
        .ofType(t.DECOLLECT)
        .map((action: t.DeCollectAction) => action.payload)
        .mergeMap(({ accessToken, topic_id }) =>
            this.service.deCollect(accessToken, topic_id)
                .map(r => {
                    return new t.DeCollectSuccessAction()
                })
                .catch(e => {

                    return of(new t.DeCollectFailAction('取消收藏主题失败.'))
                })
        );
}