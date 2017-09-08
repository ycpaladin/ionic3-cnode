import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FootMarkPage } from './foot-mark';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FootMarkPage,
  ],
  imports: [
    IonicPageModule.forChild(FootMarkPage),
    ComponentsModule,
  ],
})
export class FootMarkPageModule {}
