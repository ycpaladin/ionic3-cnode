import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers'
/**
 * Generated class for the MinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({ name: 'mine' })
@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html',
})
export class MinePage {


    isLogin: Observable<boolean>;
    user: Observable<User>;
    constructor(public navCtrl: NavController, private store: Store<fromRoot.State>) {
        this.isLogin = this.store.select(fromRoot.isLogin);
        this.user = this.store.select(fromRoot.getUser);

    }

    ionViewDidLoad() {
        // console.log('ionViewDidLoad MinePage');
    }

}
