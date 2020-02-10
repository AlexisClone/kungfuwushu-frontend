import { Model } from "./Helpers";

export enum UserRole {
    USER,
    ADMIN
}

export interface IUser {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: UserRole[];
}

export const UserModel = Model<IUser>({
    id: null,
    email: null,
    username: null,
    firstName: null,
    lastName: null,
    roles: null
});

export class User extends UserModel {}
