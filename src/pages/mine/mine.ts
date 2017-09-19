import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
// import { zip } from 'rxjs/Observable/zip';
import { Subscription } from 'rxjs/Subscription';
import { UserDetials } from '../../models/user-detials';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import * as ud from '../../actions/user-detials';
import * as user from '../../actions/user.action';
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
export class MinePage implements OnInit {


    isLogin: Observable<boolean>;
    loginname: Observable<string>;
    ud: Observable<UserDetials>;
    sub: Subscription;
    constructor(public navCtrl: NavController, private store: Store<fromRoot.State>, public toastCtrl: ToastController) {
        this.isLogin = this.store.select(fromRoot.isLogin);
        this.loginname = this.store.select(fromRoot.getLoginname);
        this.ud = this.store.select(fromRoot.getCurrentUserDetials);
    }


    ngOnInit(): void {
        // zip(this.isLogin, this.user).filter(([isLogin]) => isLogin === true).subscribe(([, { loginname }]) => {
        //     this.store.dispatch(new ud.UserDetialLoadAction({ loginname, isSelf: true }));
        // }).unsubscribe();
        this.loginname.filter(loginname => loginname !== undefined).subscribe(loginname => {
            this.store.dispatch(new ud.UserDetialLoadAction({ loginname, isSelf: true }));
        }).unsubscribe();
    }

    ionViewDidLoad() {

    }

    toMessagePage() {
        this.navCtrl.push('MessagePage');
    }

    toCollectPage() {
        this.navCtrl.push('CollectPage');
    }

    toFootMarkPage() {
        this.navCtrl.push('FootMarkPage');
    }

    onError(message) {
        const toast = this.toastCtrl.create({
            message,
            duration: 3000,
            position: 'middle'
        });
        toast.present(toast);
    }

    logOut() {
        this.store.dispatch(new user.UserLogoutAction())
    }

}
