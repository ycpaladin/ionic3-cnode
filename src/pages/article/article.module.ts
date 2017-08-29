import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';

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
