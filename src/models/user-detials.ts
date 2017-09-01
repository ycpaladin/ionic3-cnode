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
	last_reply_at: string;
}

export interface UserDetials {
	loginname: string;
	avatar_url: string;
	githubUsername: string;
	create_at: string;
	score: number;
	recent_topics: Recent_topic[];
	recent_replies: Recent_reply[];
}

