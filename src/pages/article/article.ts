import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import marked from 'marked';
import { Topic } from '../../models/topic';

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
    constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<fromRoot.State>, public actionSheetCtrl: ActionSheetController) {
        const id = this.navParams.get('id');
        this.tabName = tabs[this.navParams.get('tabName')];
        this.isFetching = this.store.select(fromRoot.getTopicIsFetching);
        this.topic = this.store.select(fromRoot.getTopic);
        this.store.dispatch(new topic.LoadAction(id));
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

    star(item) {
        // console.log(id);
        const upText = item.is_uped ? '取消赞' : '赞';
        let actionSheet = this.actionSheetCtrl.create({
            title: `@${item.author.loginname}`,
            buttons: [
                {
                    text: '回复',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                }, {
                    text: upText,
                    handler: () => {
                        console.log('Archive clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
}
