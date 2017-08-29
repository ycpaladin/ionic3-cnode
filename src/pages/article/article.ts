import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription'
import { zip } from 'rxjs/Observable/zip';

import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import marked from 'marked';
import { Topic } from '../../models/topic';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers'
import * as topic from '../../actions/topic.action';

/**
 * Generated class for the ArticlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

const tabs = {
    all: '全部',
    good: '精华',
    share: '分享',
    ask: '问答',
    job: '招聘',
    dev: '开发'
}

@IonicPage()
@Component({
    selector: 'page-article',
    templateUrl: 'article.html',
})
export class ArticlePage implements OnInit, OnChanges, OnDestroy {



    tabName: string;
    isFetching: Observable<boolean>;
    topic: Observable<Topic>;
    isLogin: Observable<boolean>;
    user: Observable<User>;
    message: Subscription;
    constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<fromRoot.State>, public toastCtrl: ToastController) {

        const topicId = this.navParams.get('id') || '599d7facebaa046923a826db';
        this.tabName = tabs[this.navParams.get('tabName') || 'dev'];
        this.isFetching = this.store.select(fromRoot.getTopicIsFetching);
        this.topic = this.store.select(fromRoot.getTopic);
        this.isLogin = this.store.select(fromRoot.isLogin);
        this.user = this.store.select(fromRoot.getUser);
        this.message = this.store.select(fromRoot.getTopicMessage)
            .filter(message => message !== null && message !== undefined && message != '')
            .subscribe(message => {
                this.onError(message);
            });
        // this.replies = this.store.select(fromRoot.getReplies);
        this.user.subscribe(user => {
            this.store.dispatch(new topic.LoadAction({ topicId, accessToken: user && user.accessToken }));
        }).unsubscribe();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ArticlePage');
    }

    convertMark(content) {
        return marked(content);
    }

    ngOnInit(): void {
        // this.
    }

    ngOnChanges(changes: SimpleChanges): void {
        // this.replyItem = undefined;
    }


    ngOnDestroy(): void {
        this.message.unsubscribe();
    }



    collect() {
        zip(this.user, this.topic).subscribe(([user, t]) => {
            if (t.is_collect === true) {
                this.store.dispatch(new topic.DeCollectAction({ topic_id: t.id, accessToken: user.accessToken }))
            } else {
                this.store.dispatch(new topic.CollectAction({ topic_id: t.id, accessToken: user.accessToken }))
            }
        }).unsubscribe();
    }

    onError(message: string) {
        const toast = this.toastCtrl.create({
            message,
            duration: 3000,
            position: 'middle'
        });
        toast.present(toast);
    }
}
