import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';
// import { StoreModule } from '@ngrx/store';
// import { reducer } from '../../reducers/index';
// import { EffectsModule } from '@ngrx/effects';

// //@effect
// import { TopicEffects } from '../../effects/topic.effect';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ArticlePage,
    ],
    imports: [
        ComponentsModule,
        // StoreModule.forRoot(reducer),
        IonicPageModule.forChild(ArticlePage),
    ],
})
export class ArticlePageModule { }
