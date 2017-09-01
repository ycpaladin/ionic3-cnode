import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';

import { Observable } from 'rxjs/Observable';
import { Topic } from '../../models/topic';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { UserDetials } from '../../models/user-detials';

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
    action: string;
}

interface LoginResult {
    success: boolean;
    loginname: string;
    id: string;
    avatar_url: string;
}


interface UserDetialsResult {
    success: boolean;
    data: UserDetials;
}

export interface ReplyResult {
    success: boolean;
    reply_id: string;
    error_msg: string
}

export interface MessageResult {
    success: boolean;
    data: {
        has_read_messages: Message[],
        hasnot_read_messages: Message[]
    }
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

    getTopicById(id: string, accessToken: string = ''): Observable<Topic> {
        return this.http.get(`${this.baseUrl}/topic/${id}?accesstoken=${accessToken}&mdrender=false`)
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


    upReply(accesstoken: string, replyId: string): Observable<{ replyId: string, upType: string }> {
        return this.http.post(`${this.baseUrl}/reply/${replyId}/ups`, { accesstoken })
            .map(r => r.json() as UpReplyResult)
            .filter(r => r.success)
            .map(t => ({ replyId: replyId, upType: t.action }));
    }


    /**
     * 收藏主题
     * @param accesstoken 
     * @param topic_id 
     */
    collect(accesstoken: string, topic_id: string): Observable<boolean> {
        return this.http.post(`${this.baseUrl}/topic_collect/collect`, { accesstoken, topic_id })
            .map(r => r.json())
            .map((t: boolean) => t);

    }

    /**
     * 取消收藏主题
     * @param accesstoken 
     * @param topic_id 
     */
    deCollect(accesstoken: string, topic_id: string): Observable<boolean> {
        return this.http.post(`${this.baseUrl}/topic_collect/de_collect`, { accesstoken, topic_id })
            .map(r => r.json())
            .map((t: boolean) => t)
            .catch((e, caught) => {
                console.log(e);
                return of(false);
            });
    }


    /**
     * 新建评论
     * @param accesstoken 用户的 accessToken
     * @param topic_id 评论的主题ID
     * @param content 评论的主体
     * @param reply_id 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
     */
    replies(accesstoken: string, topic_id: string, content: string, reply_id?: string): Observable<ReplyResult> {
        return this.http.post(`${this.baseUrl}/topic/${topic_id}/replies`, { accesstoken, content, reply_id })
            .map(r => r.json() as ReplyResult)
    }

    /**
     * 用户详情
     * @param loginname 用户登录名称
     */
    getUserInfo(loginname: string): Observable<UserDetialsResult> {
        return this.http.get(`${this.baseUrl}/user/${loginname}`)
            .map(r => r.json() as UserDetialsResult)
            // .filter(r => r.success)
            .map(r => r.data)
            .catch((e, caught) => {
                // console.log(e);
                return of(e);
            });
    }

    /**
     * 获取用户已读/未读消息
     * @param accesstoken 
     */
    getMessages(accesstoken: string): Observable<MessageResult> {
        return this.http.get(`${this.baseUrl}/messages`, {
            params: {
                accesstoken
            }
        }).map(r => r.json() as MessageResult)
            .map(r => r.data)
            .catch((e, caught) => {
                return of(e);
            });
    }
}

