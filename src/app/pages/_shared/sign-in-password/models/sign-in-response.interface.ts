import { IUser } from "./user.interface";

export interface ISigninResponse {
    user: IUser;
    token: string;
}