import { ThemeEnums } from "./styled";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  friends: string[];
  theme: ThemeEnums;
  birthday?: string;
  city?: string;
  education?: string;
  familyStatus?: string;
  createdAt: string;
  updatedAt: string;
}
