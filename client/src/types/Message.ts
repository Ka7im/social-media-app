import { IUser } from './User';

export interface IMessage {
    _id: string;
    message: string;
    from: IUser;
    to: IUser;
    createdAt: string;
    updatedAt: string;
}
