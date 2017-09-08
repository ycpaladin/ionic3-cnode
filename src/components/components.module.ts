import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { DirectivesModule } from '../directives/directives.module';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';

import { CnodeTopicListComponent } from './cnode-topic-list/cnode-topic-list';
import { CnodeFetchingComponent } from './cnode-fetching/cnode-fetching';
import { CnodeUserIconComponent } from './cnode-user-icon/cnode-user-icon';
import { CnodeReplyComponent } from './cnode-reply/cnode-reply';
import { CnodeReplyListComponent } from './cnode-reply-list/cnode-reply-list';
import { CnodeUserDetialsComponent } from './cnode-user-detials/cnode-user-detials';
import { CnodeUserDetialsWrapComponent } from './cnode-user-detials-wrap/cnode-user-detials-wrap';
import { CnodeTopicItemComponent } from './cnode-topic-item/cnode-topic-item';
import { CnodeMessageListComponent } from './cnode-message-list/cnode-message-list';
import { CnodeMessageGroupComponent } from './cnode-message-group/cnode-message-group';
import { CnodeUserLoginComponent } from './cnode-user-login/cnode-user-login';
import { CnodeUserFootMarkComponent } from './cnode-user-foot-mark/cnode-user-foot-mark';

@NgModule({
    declarations: [
        CnodeTopicListComponent,
        CnodeFetchingComponent,
        CnodeUserIconComponent,
        CnodeReplyComponent,
        CnodeReplyListComponent,
        CnodeUserDetialsComponent,
        CnodeUserDetialsWrapComponent,
        CnodeTopicItemComponent,
        CnodeMessageListComponent,
        CnodeMessageGroupComponent,
    CnodeUserLoginComponent,
    CnodeUserFootMarkComponent,
    ],
    imports: [
        IonicModule,
        HttpModule,
        DirectivesModule,
    ],
    exports: [
        CnodeTopicListComponent,
        CnodeFetchingComponent,
        CnodeUserIconComponent,
        CnodeReplyComponent,
        CnodeReplyListComponent,
        CnodeUserDetialsComponent,
        CnodeUserDetialsWrapComponent,
        CnodeTopicItemComponent,
        CnodeMessageListComponent,
        CnodeMessageGroupComponent,
    CnodeUserLoginComponent,
    CnodeUserFootMarkComponent,
    ],
    providers: [CnodeWebApiProvider]
})
export class ComponentsModule { }
