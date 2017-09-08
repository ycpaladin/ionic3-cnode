import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
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
                if (users.length === 0) {
                    const user: User = {
                        id: '5816eed5b37ee8fb33978977',
                        loginname: 'ycpaladin',
                        avatar_url: 'https://avatars3.githubusercontent.com/u/3337028?v=4&s=120',
                        accessToken: '62c2f14b-24e0-4a3e-bc34-a5c0baeab5e0'
                    };
                    const x = this.writeUserToLocal(user).subscribe((result) => {
                        console.log('app starting... =>', result);
                        if (result === true) {
                            x.unsubscribe();
                        }
                    });
                    return user;
                } else {
                    return users[0];
                }

            });
    }

    removeLocalUser(id: string): Observable<boolean> {
        return this.db.executeWrite('user', 'delete', [id]).map(() => true).catch(() => of(false))
    }

    writeUserToLocal(user: User): Observable<boolean> {
        return this.db.insert('user', [user]).map((u) => true).catch(() => of(false));
    }

}
