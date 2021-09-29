export interface User {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    userLevel?: number;
    salt?: number;
    fullName?: string;
    phone?: string;
    emailVerified?: boolean;
    profile?: string;
    cover?: string;
}