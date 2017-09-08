import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { UserDetials } from '../../models/user-detials';

/**
 * Generated class for the FootMarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'FootMarkPage', segment: 'footMark' })
@Component({
    selector: 'page-foot-mark',
    templateUrl: 'foot-mark.html',
})
export class FootMarkPage {

    ud: Observable<UserDetials>;
    constructor(public navCtrl: NavController, public store: Store<fromRoot.State>, public navParams: NavParams) {
        this.ud = this.store.select(fromRoot.getCurrentUserDetials);
    }

    ionViewDidLoad() {

    }

}
