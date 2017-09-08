import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { UserDetials } from '../../models/user-detials';
import * as ud from '../../actions/user-detials';
import * as fromRoot from '../../reducers';

/**
 * Generated class for the DetialsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
    name: 'page-detials',
    segment: 'user/:loginname'
})
@Component({
    selector: 'page-detials',
    templateUrl: 'detials.html',
})
export class DetialsPage implements OnInit {

    ud: Observable<UserDetials>;
    loginname: string;
    constructor(public navCtrl: NavController, public store: Store<fromRoot.State>, public navParams: NavParams) {
        this.loginname = this.navParams.get('loginname');
        this.ud = this.store.select(fromRoot.getUserDetials);
    }

    ngOnInit(): void {
        this.store.dispatch(new ud.UserDetialLoadAction({ loginname: this.loginname, isSelf: false }));
    }

    ionViewDidLoad() {

    }

}
