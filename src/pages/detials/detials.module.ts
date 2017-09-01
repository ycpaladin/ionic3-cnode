import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetialsPage } from './detials';

@NgModule({
  declarations: [
    DetialsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetialsPage),
  ],
})
export class DetialsPageModule {}
