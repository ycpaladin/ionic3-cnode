import { Component, ViewChild, Input, OnChanges, SimpleChanges, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/Subscription'
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
export class CnodeReplyComponent implements OnInit, OnChanges, OnDestroy {




    @Input() topicId: string;// 主题ID
    @Input() replyItem?: { author: { loginname: string }, id: string };
    @ViewChild('replyTextInput') replyTextInput: ElementRef;

    content: string;
    user: Observable<User>;
    error: Subscription;
    constructor(private store: Store<fromRoot.State>) {
        this.user = this.store.select(fromRoot.getUser);
    }

    ngOnInit(): void {
        this.error = this.store.select(fromRoot.getReplyError).subscribe(error => {
            console.log(error);
        });
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

    ngOnDestroy(): void {
        this.error.unsubscribe();
    }

}
