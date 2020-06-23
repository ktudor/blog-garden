import { RoleEnum } from "./enums/roleEnum";

export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: RoleEnum;
    token?: string;
}