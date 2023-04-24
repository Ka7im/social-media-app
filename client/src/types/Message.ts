import { IUser } from './User';

export interface IMessage {
    _id: string;
    message?: string;
    audioUrl?: string;
    videoUrl?: string;
    from: IUser;
    to: IUser;
    createdAt: string;
    updatedAt: string;
}
