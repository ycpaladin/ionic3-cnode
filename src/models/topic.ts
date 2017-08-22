
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
    author: {
        loginname: string;
        avatar_url: string;
    },
    replies: {
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
    }[],
    is_collect: boolean

}