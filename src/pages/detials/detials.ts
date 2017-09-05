import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
export class DetialsPage {



    loginname: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // loginname
        this.loginname = this.navParams.get('loginname');
    }

    ionViewDidLoad() {

    }

}
