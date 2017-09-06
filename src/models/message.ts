import { Author } from './user-detials';

// export interface Message {
//     id: string;
//     type: string;
//     has_read: boolean;
//     author: Author
// }

export interface Topic {
	id: string;
	title: string;
	last_reply_at: string;
}

export interface Reply {
	id: string;
	content: string;
	ups: any[];
	create_at: string;
}

export interface Message {
	id: string;
	type: string;
	has_read: boolean;
	author: Author;
	topic: Topic;
	reply: Reply;
	create_at: string;
}

export interface Data {
	has_read_messages: Message[];
	hasnot_read_messages: Message[];
}

// export interface RootObject {
// 	success: boolean;
// 	data: Data;
// }