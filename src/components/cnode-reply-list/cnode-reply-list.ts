import { Component, Output, EventEmitter, } from '@angular/core';
import { ActionSheetController, ToastController, NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/Observable/zip'
import { Reply } from '../../models/topic';
import { User } from '../../models/user';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers'
import * as topic from '../../actions/topic.action';

import marked from 'marked';

/**
 * Generated class for the CnodeReplyListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-reply-list',
    templateUrl: 'cnode-reply-list.html'
})
export class CnodeReplyListComponent {

    replies: Observable<Reply[]>;
    user: Observable<User>;
    isLogin: Observable<boolean>;
    replyItem: Reply;

    @Output() onError = new EventEmitter<string>(true);

    constructor(public navCtrl: NavController,
        private store: Store<fromRoot.State>,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController) {

        this.replies = this.store.select(fromRoot.getReplies);
        this.user = this.store.select(fromRoot.getUser);
        this.isLogin = this.store.select(fromRoot.isLogin);
    }

    openMenu(item: Reply) {
        zip(this.user, this.isLogin).subscribe
            (([user, isLogin]) => {
                if (isLogin === false) {
                    return;
                }
                const upText = item.is_uped ? '取消赞' : '赞';
                let actionSheet = this.actionSheetCtrl.create({
                    title: `@${item.author.loginname}`,
                    buttons: [
                        {
                            text: '回复',
                            handler: () => {
                                this.replyItem = item;
                            }
                        }, {
                            text: upText,
                            handler: () => {
                                if (item.author.loginname !== user.loginname) {
                                    // 去点赞..
                                    this.store.dispatch(new topic.UpReplyAction(item.id));
                                } else {
                                    // 不能自己给自己点赞
                                    this.onError.emit('自己给自己点赞的行为是不允许的哦！');
                                }
                            }
                        }
                    ]
                });
                actionSheet.present();
            }).unsubscribe();
    }

    convertMark(content) {
        return marked(content);
    }

    toUserDetials($event: MouseEvent, loginname: string) {
        $event.stopPropagation(); // 阻止事件冒泡
        this.navCtrl.push('page-detials', { loginname })
    }

}
