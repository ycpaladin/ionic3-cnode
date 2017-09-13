import { Component, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { UserLoginAction } from '../../actions/user.action';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { zip } from 'rxjs/Observable/zip';

/**
 * Generated class for the CnodeUserLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'cnode-user-login',
    templateUrl: 'cnode-user-login.html'
})
export class CnodeUserLoginComponent implements OnChanges, OnDestroy {



    @Output() onError = new EventEmitter<string>();
    message: Observable<string>;
    error: Observable<boolean>;
    sub: Subscription;
    constructor(public alertCtrl: AlertController, public store$: Store<fromRoot.State>) {
        this.message = this.store$.select(fromRoot.getUserMessage);
        this.error = this.store$.select(fromRoot.getUserError);
        this.sub = zip(this.error, this.message)
            // .filter(([error]) => error === true)
            .subscribe(([error, msg]) => {
                console.log('======>', error, msg)
                if (error === true)
                    this.onError.emit(msg);
            });

        // this.error.subscribe((v) => {
        //     console.log('======>', v)
        // })
        // this.sub = this.error.filter(t=>t === true).subscribe(()=>{
        //     console.log('true=>');
        // })
        // this.message.subscribe()
    }


    ngOnChanges(changes: SimpleChanges): void {
        console.log('1111=>')
    }




    login() {
        let prompt = this.alertCtrl.create({
            title: '登陆',
            message: "登陆cnode网站之后，进入设置页面，在最下面找到Access Token字符串并填写在下面",
            inputs: [
                {
                    name: 'accessToken',
                    placeholder: 'Access Token'
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: '确定',
                    handler: ({ accessToken }) => {
                        if (accessToken === '') {
                            this.onError.emit('Access Token不能为空字符串');
                            return;
                        }
                        this.store$.dispatch(new UserLoginAction(accessToken));
                    }
                }
            ]
        });
        prompt.present();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
