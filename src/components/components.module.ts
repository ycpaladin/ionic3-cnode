import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CnodeItemComponent } from './cnode-item/cnode-item';
import { CnodeListComponent } from './cnode-list/cnode-list';
import { HttpModule } from '@angular/http';

//@ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from '../reducers/index';
import { EffectsModule } from '@ngrx/effects';

//@effect
import { TopicEffects } from '../effects/topic.effect';
import { UserEffects } from '../effects/user.effect';

import { CnodeWebApiProvider } from '../providers/cnode-web-api/cnode-web-api';
import { FromNowComponent } from './from-now/from-now';
import { CnodeFetchingComponent } from './cnode-fetching/cnode-fetching';
import { CnodeUserIconComponent } from './cnode-user-icon/cnode-user-icon';

@NgModule({
    declarations: [CnodeItemComponent, CnodeListComponent,
        FromNowComponent,
        CnodeFetchingComponent,
        CnodeUserIconComponent],
    imports: [
        IonicModule,
        HttpModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([TopicEffects, UserEffects])
    ],
    exports: [CnodeItemComponent, CnodeListComponent,
        FromNowComponent,
        CnodeFetchingComponent,
        CnodeUserIconComponent],
    providers: [CnodeWebApiProvider]
})
export class ComponentsModule { }
