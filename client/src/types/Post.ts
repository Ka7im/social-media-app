import { IUser } from './User';

export interface IPost {
    _id: string;
    title: string;
    text: string;
    tags: string[];
    viewsCount: number;
    user: IUser;
    createdAt: string;
    updatedAt: string;
}
