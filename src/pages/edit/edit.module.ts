import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPage } from './edit';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
    declarations: [
        EditPage,
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(EditPage),
    ],
})
export class EditPageModule { }
