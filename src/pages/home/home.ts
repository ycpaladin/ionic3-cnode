import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    pet = 'dev';
    isLogin: Observable<boolean>;
    constructor(public navCtrl: NavController, public store: Store<fromRoot.State>) {
        this.isLogin = this.store.select(fromRoot.isLogin);
    }

    toAdd() {
        this.navCtrl.push('add');
    }

}
