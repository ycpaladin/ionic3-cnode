import { Component, ViewChild, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as fromRoot from '../../reducers'
import * as reply from '../../actions/reply.action';
import { User } from '../../models/user';
// import 
/**
 * Generated class for the CnodeReplyComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
    selector: 'cnode-reply',
    templateUrl: 'cnode-reply.html'
})
export class CnodeReplyComponent implements OnChanges {


    @Input() topicId: string;// 主题ID
    @Input() replyItem?: { author: { loginname: string }, id: string };
    @ViewChild('replyTextInput') replyTextInput: ElementRef;

    content: string;
    user: Observable<User>;
    constructor(private store: Store<fromRoot.State>) {
        this.user = this.store.select(fromRoot.getUser);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.content = this.replyItem ? `@${this.replyItem.author.loginname} ` : '';
        // (<HTMLInputElement>this.replyTextInput.nativeElement).focus();
    }

    reply() {
        // console.log(this.content)
        this.user.subscribe(({ accessToken }) => {
            this.store.dispatch(new reply.ReplyAction({ accessToken, topicId: this.topicId, content: this.content, replyId: this.replyItem && this.replyItem.id }));
        }).unsubscribe();
    }

}
