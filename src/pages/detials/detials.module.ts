import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetialsPage } from './detials';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        DetialsPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(DetialsPage),
    ],
})
export class DetialsPageModule { }
