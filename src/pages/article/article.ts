import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { zip } from 'rxjs/Observable/zip';

import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
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
export class ArticlePage implements OnInit {

    tabName: string;
    isFetching: Observable<boolean>;
    topic: Observable<Topic>;
    isLogin: Observable<boolean>;
    user: Observable<User>;
    // replies: Observable<any[]>;
    replyText: string;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private store: Store<fromRoot.State>,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController) {

        const topicId = this.navParams.get('id') || '599d7facebaa046923a826db';
        this.tabName = tabs[this.navParams.get('tabName')] || 'dev';
        this.isFetching = this.store.select(fromRoot.getTopicIsFetching);
        this.topic = this.store.select(fromRoot.getTopic);
        this.isLogin = this.store.select(fromRoot.isLogin);
        this.user = this.store.select(fromRoot.getUser);
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

        // this.store.select(fromRoot.getTopic).subscribe(topic => {

        //     console.log(topic);
        // })
    }

    openMenu(item) {

        this.user.subscribe(user => {
            const upText = item.is_uped ? '取消赞' : '赞';
            let actionSheet = this.actionSheetCtrl.create({
                title: `@${item.author.loginname}`,
                buttons: [
                    {
                        text: '回复',
                        handler: () => {

                        }
                    }, {
                        text: upText,
                        handler: () => {
                            if (item.author.loginname !== user.loginname) {
                                // 去点赞..
                                this.store.dispatch(new topic.UpReplyAction({ replyId: item.id, accessToken: user.accessToken }));
                            } else {
                                // 不能自己给自己点赞
                                let toast = this.toastCtrl.create({
                                    message: '自己给自己点赞的行为是不允许的哦！',
                                    duration: 3000,
                                    position: 'middle'
                                });
                                toast.present(toast);
                            }
                        }
                    }
                ]
            });
            actionSheet.present();
        }).unsubscribe();


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
}
