import { Component, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/Observable/zip';

import * as fromRoot from '../../reducers';
import { TopicEditAction, LeaveEditPageAction } from '../../actions/topic.action';

import { TopicFromModel } from '../../models/topic';
import { CnodeTopicFormComponent } from '../../components/cnode-topic-form/cnode-topic-form';


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
export class EditPage implements OnDestroy {
    model: TopicFromModel;
    error: Observable<boolean>;
    message: Observable<string>;
    result: Subscription;
    @ViewChild("form") form: CnodeTopicFormComponent;
    constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<fromRoot.State>, public toastCtrl: ToastController) {

        this.model = this.navParams.get('model')
        this.error = this.store.select(fromRoot.getFormError);
        this.message = this.store.select(fromRoot.getFormMsg);
        this.result = zip(this.error, this.message).subscribe(([error, message]) => {
            if (error === false) {
                this.navCtrl.pop();
            } else {
                // 提示消息
                const toast = this.toastCtrl.create({
                    message,
                    duration: 3000,
                    position: 'middle'
                });
                toast.present(toast);
            }
        });
    }

    ionViewDidLoad() {
    }

    submit() {
        if (this.form.isValid === true) {
            this.store.dispatch(new TopicEditAction(this.model));
        }
    }


    ngOnDestroy(): void {
        this.result.unsubscribe();
        this.store.dispatch(new LeaveEditPageAction());
    }
}
