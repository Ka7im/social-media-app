import { ThemeEnums } from './styled';

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
    theme: ThemeEnums;
    createdAt: string;
    updatedAt: string;
}
