import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../../models/user';

import { Database } from '@ngrx/db';

/*
  Generated class for the CnodeUserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CnodeUserProvider {

    constructor(public db: Database) {

    }


    getLocalUser(): Observable<User> {
        return this.db.query('user').map((u: User) => u).toArray()
            .map((users: User[]) => {
                return {
                    id: '5816eed5b37ee8fb33978977',
                    loginname: 'ycpaladin',
                    avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
                    accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
                };
            });
    }

}
