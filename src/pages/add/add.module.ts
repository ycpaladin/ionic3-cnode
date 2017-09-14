import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPage } from './add';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        AddPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(AddPage),
    ],
})
export class AddPageModule { }
