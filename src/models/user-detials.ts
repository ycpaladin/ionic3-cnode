export interface Author {
    loginname: string;
    avatar_url: string;
}

export interface Recent_topic {
    id: string;
    author: Author;
    title: string;
    last_reply_at: string;
}

export interface Recent_reply {
    id: string;
    author: Author;
    title: string;
    last_reply_at: Date;
}

export interface UserDetials {
    loginname: string;
    avatar_url: string;
    githubUsername: string;
    create_at: Date;
    score: number;
    recent_topics: Recent_topic[];
    recent_replies: Recent_reply[];
}


export const defaultObject: UserDetials = {
    loginname: '',
    avatar_url: '',
    githubUsername: '',
    create_at: new Date(),
    score: 0,
    recent_replies: [],
    recent_topics: []
}
