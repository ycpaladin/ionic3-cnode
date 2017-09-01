import { Author } from './user-detials';

export interface Message {
    id: string;
    type: string;
    has_read: boolean;
    author: Author
}