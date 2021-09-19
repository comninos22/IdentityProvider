export interface User extends Express.User {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    userLevel?: number;
}