import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers'
@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})
export class MinePage implements OnInit {
    

    isLogin: Observable<boolean>;
    user: Observable<User>;
    constructor(public navCtrl: NavController, private store: Store<fromRoot.State>) {
        this.isLogin = this.store.select(fromRoot.isLogin);
        
        this.user = this.store.select(fromRoot.getUser);
        // this.store.select(fromRoot.getUser).subscribe(u =>{
        //     console.log('user=>',u);
        // })
    }
    
    ngOnInit(): void {
        
    }
}
