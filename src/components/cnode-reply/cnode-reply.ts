import { Component, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, OnInit, OnDestroy } from '@angular/core';

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
export class CnodeReplyComponent implements OnInit, OnChanges, OnDestroy {




    @Input() topicId: string;// 主题ID
    @Input() replyItem?: { author: { loginname: string }, id: string };
    @Output() onError = new EventEmitter<string>(true);
    @ViewChild('replyTextInput') replyTextInput: ElementRef;

    content: string;
    user: Observable<User>;
    // error: Subscription;
    constructor(private store: Store<fromRoot.State>) {
        this.user = this.store.select(fromRoot.getUser);
    }

    ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.content = this.replyItem ? `@${this.replyItem.author.loginname} ` : '';
    }

    reply() {
        this.user.subscribe(({ accessToken }) => {
            this.store.dispatch(new reply.ReplyAction({ accessToken, topicId: this.topicId, content: this.content, replyId: this.replyItem && this.replyItem.id }));
        }).unsubscribe();
    }

    ngOnDestroy(): void {
    }



}
