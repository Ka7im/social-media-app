import { IUser } from './User';

export interface IComment {
    comment: string;
    user: IUser;
    post: string;
    imageUrl?: string;
}
