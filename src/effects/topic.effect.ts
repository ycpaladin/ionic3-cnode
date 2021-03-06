import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/mergeMap';

import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';

import * as topic from '../actions/topics.action';
import * as t from '../actions/topic.action';
import * as reply from '../actions/reply.action';

import * as fromRoot from '../reducers'

import { CnodeWebApiProvider, ErrorResult, TopicUpdateResult } from '../providers/cnode-web-api/cnode-web-api'; //, TopicUpdateResult

@Injectable()
export class TopicEffects {
    constructor(private actions$: Actions,
        private store$: Store<fromRoot.State>,
        private service: CnodeWebApiProvider) { }

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
        .map((action: t.LoadAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([topicId, accessToken]) => {
            return this.service.getTopicById(topicId, accessToken).map(topic =>
                new t.LoadSuccessAction(topic)
            ).catch(() => of(new t.LoadFailAction('')));
        });


    @Effect()
    upReply$: Observable<Action> = this.actions$
        .ofType(t.UPREPLEY)
        .map((action: t.UpReplyAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([replyId, accessToken]) => {
            return this.service.upReply(accessToken, replyId)
                .map(r => new t.UpReplySuccessAction(r))
                .catch(e => of(new t.UpReplyFailAction(e)))
        });


    @Effect()
    collect$: Observable<Action> = this.actions$
        .ofType(t.COLLECT)
        .map((action: t.CollectAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([topic_id, accessToken]) =>
            this.service.collect(accessToken, topic_id)
                .map(r => new t.CollectSuccessAction())
                .catch(e => of(new t.CollectFailAction('收藏主题失败.')))
        );

    @Effect()
    deCollect$: Observable<Action> = this.actions$
        .ofType(t.DECOLLECT)
        .map((action: t.DeCollectAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([topic_id, accessToken]) =>
            this.service.deCollect(accessToken, topic_id)
                .map(r => {
                    return new t.DeCollectSuccessAction()
                })
                .catch(e => {

                    return of(new t.DeCollectFailAction('取消收藏主题失败.'))
                })
        );


    @Effect()
    reply$: Observable<Action> = this.actions$
        .ofType(reply.REPLY)
        .map((action: reply.ReplyAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([{ topicId, content, replyId }, accessToken]) =>
            this.service.replies(accessToken, topicId, content, replyId)
                .filter(r => r.success)
                .mergeMap(() => this.service.getTopicById(topicId, accessToken).map(t => new reply.ReplySuccessAction(t)))
                .catch(e => {
                    const { error_msg } = e.json();
                    return of(new reply.ReplyFailAction(error_msg));
                })
        );

    @Effect()
    add$: Observable<Action> = this.actions$
        .ofType(t.ADD_TOPIC)
        .map((action: t.TopicAddAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([model, accessToken]) => this.service.addTopic(accessToken, model).map(r => {
            if (r.success === true) {
                // const { topic_id } = <TopicUpdateResult>r;
                this.store$.dispatch(new topic.ReloadAction({ tabName: model.tab, pageIndex: 1 }));
                return new t.TopicAddSuccessAction();
            } else {
                const { error_msg } = <ErrorResult>r;
                return new t.TopicAddFailAction(error_msg);
            }
        })).catch(e => of(new t.TopicAddFailAction('新建主题失败.')));

    @Effect()
    edit$: Observable<Action> = this.actions$
        .ofType(t.EDIT_TOPIC)
        .map((action: t.TopicEditAction) => action.payload)
        .withLatestFrom(this.store$.select(fromRoot.getAccessToken))
        .mergeMap(([model, accessToken]) => this.service.editTopic(accessToken, model).map(r => {
            if (r.success === true) {
                const { topic_id } = <TopicUpdateResult>r;
                this.store$.dispatch(new topic.ReloadAction({ tabName: model.tab, pageIndex: 1 }));
                this.store$.dispatch(new t.LoadAction(topic_id))
                return new t.TopicEditSuccessAction();
            } else {
                const { error_msg } = <ErrorResult>r;
                return new t.TopicEditFailAction(error_msg);
            }
        })).catch(e => of(new t.TopicEditFailAction('编辑主题失败.')));

}