import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Topic } from '../../models/topic';
import { User } from '../../models/user';
// interface Result<T> {

//     success: boolean;
//     data: T;
// }

interface GetTopicsResult {
    success: boolean;
    data: Topic[]
}

interface GetTopicResult {
    success: boolean;
    data: Topic
}

interface UpReplyResult {
    success: boolean;
    data: string;
}

interface LoginResult {
    success: boolean;
    loginname: string;
    id: string;
    avatar_url: string;
}

/*
  Generated class for the CnodeWebApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CnodeWebApiProvider {

    baseUrl = 'https://cnodejs.org/api/v1';

    constructor(public http: Http) {

    }

    getTopics(tabName: string = '', page: number = 1, limit: number = 15, mdrender: boolean = false): Observable<Topic[]> {
        return this.http.get(`${this.baseUrl}/topics?tab=${tabName}&page=${page}&limit=${limit}&mdrender=${mdrender}`)
            .map(r => r.json() as GetTopicsResult)
            .map(d => d.data);
    }

    getTopicById(id: string): Observable<Topic> {
        return this.http.get(`${this.baseUrl}/topic/${id}?mdrender=false`)
            .map(r => r.json() as GetTopicResult)
            .filter(t => t.success)
            .map(t => t.data);
    }

    login(accessToken: string): Observable<User> {
        return this.http.post(`${this.baseUrl}/accesstoken`, { accessToken })
            .map(r => r.json() as LoginResult)
            .filter(r => r.success)
            .map(({ id, loginname, avatar_url }) => ({ id, loginname, avatar_url, accessToken }));
    }


    upReply(accesstoken: string, replyId): Observable<string> {
        return this.http.post(`${this.baseUrl}/reply/${replyId}/ups`, { accesstoken })
            .map(r => r.json() as UpReplyResult)
            .filter(r => r.success)
            .map(t => t.data);
    }


}
