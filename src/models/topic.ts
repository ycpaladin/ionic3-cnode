
import { Author } from './user-detials';

/**
 * 文章记录
 */
export interface Topic {
    // ID
    id: string;
    author_id: string;
    tab: string;
    content: string;
    // 文章标题
    title: string;
    last_reply_at: Date,
    good: boolean;
    top: boolean;
    reply_count: number;
    visit_count: number;
    create_at: Date;
    author: Author,
    replies?: Reply[],
    is_collect?: boolean
}


export interface Reply {
    id: string;
    author: {
        loginname: string;
        avatar_url: string;
    },
    content: string,
    ups: any[],
    create_at: Date;
    reply_id: string;
    is_uped: boolean;
}

export const defaultTopic: Topic = {
    id: '',
    author_id: '',
    tab: '',
    content: '',
    // 文章标题
    title: '',
    last_reply_at: new Date(),
    good: false,
    top: false,
    reply_count: 0,
    visit_count: 0,
    create_at: new Date(),
    author: {
        loginname: '',
        avatar_url: '',
    },
    replies: [],
    is_collect: false
}


export interface TopicFromModel {
    topic_id: string;
    title: string;
    tab: string;
    content: string;
}