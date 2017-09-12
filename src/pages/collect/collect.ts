import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { CollectLoadAction } from '../../actions/collect.action';

import { Observable } from 'rxjs/Observable';

import { Topic } from '../../models/topic';

/**
 * Generated class for the CollectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({ name: 'CollectPage', segment: 'collect' })
@Component({
    selector: 'page-collect',
    templateUrl: 'collect.html',
})
export class CollectPage implements OnInit {


    collect: Observable<Topic[]>;
    shouldReload: Observable<boolean>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public store$: Store<fromRoot.State>) {
        this.collect = this.store$.select(fromRoot.getCollect);
        this.shouldReload = this.store$.select(fromRoot.getCollectShouldReload);

    }

    ngOnInit(): void {
        this.shouldReload.filter(t => t === true).subscribe(reload => {
            this.store$.dispatch(new CollectLoadAction());
        }).unsubscribe();

    }

    ionViewDidLoad() {
        console.log('111')
    }

}
