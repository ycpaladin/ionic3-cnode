import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';

import { CnodeTopicListComponent } from './cnode-topic-list/cnode-topic-list';
import { FromNowComponent } from './from-now/from-now';
import { CnodeFetchingComponent } from './cnode-fetching/cnode-fetching';
import { CnodeUserIconComponent } from './cnode-user-icon/cnode-user-icon';
import { CnodeReplyComponent } from './cnode-reply/cnode-reply';
import { CnodeReplyListComponent } from './cnode-reply-list/cnode-reply-list';
import { CnodeMineIconComponent } from './cnode-mine-icon/cnode-mine-icon';
import { CnodeUserDetialsComponent } from './cnode-user-detials/cnode-user-detials';
import { CnodeTopicItemComponent } from './cnode-topic-item/cnode-topic-item';
import { CnodeMessageListComponent } from './cnode-message-list/cnode-message-list';
import { CnodeMessageGroupComponent } from './cnode-message-group/cnode-message-group';

@NgModule({
    declarations: [CnodeTopicListComponent,
        FromNowComponent,
        CnodeFetchingComponent,
        CnodeUserIconComponent,
        CnodeReplyComponent,
        CnodeReplyListComponent,
        CnodeMineIconComponent,
        CnodeUserDetialsComponent,
        CnodeTopicItemComponent,
        CnodeMessageListComponent,
        CnodeMessageGroupComponent],
    imports: [
        IonicModule,
        HttpModule,
    ],
    exports: [CnodeTopicListComponent,
        FromNowComponent,
        CnodeFetchingComponent,
        CnodeUserIconComponent,
        CnodeReplyComponent,
        CnodeReplyListComponent,
        CnodeMineIconComponent,
        CnodeUserDetialsComponent,
        CnodeTopicItemComponent,
        CnodeMessageListComponent,
        CnodeMessageGroupComponent],
    providers: [CnodeWebApiProvider]
})
export class ComponentsModule { }
