import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    declarations: [
        ArticlePage,
    ],
    imports: [
        ComponentsModule,
        DirectivesModule,
        IonicPageModule.forChild(ArticlePage),
    ],
})
export class ArticlePageModule { }
