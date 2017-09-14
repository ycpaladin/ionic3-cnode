import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/Observable/zip';

import * as fromRoot from '../../reducers';
import { TopicEditAction } from '../../actions/topic.action';

import { TopicFromModel } from '../../models/topic';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'edit' })
@Component({
    selector: 'page-edit',
    templateUrl: 'edit.html',
})
export class EditPage {
    model: TopicFromModel;
    error: Observable<boolean>;
    message: Observable<string>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<fromRoot.State>, public toastCtrl: ToastController) {

        this.model = this.navParams.get('model')
        this.error = this.store.select(fromRoot.getFormError);
        this.message = this.store.select(fromRoot.getFormMsg);
        zip(this.error, this.message).filter(([error,]) => error === true).subscribe(([error, message]) => {
            // 提示消息
            const toast = this.toastCtrl.create({
                message,
                duration: 3000,
                position: 'middle'
            });
            toast.present(toast);
        });
    }

    ionViewDidLoad() {
    }

    submit() {
        this.store.dispatch(new TopicEditAction(this.model));
    }
}
