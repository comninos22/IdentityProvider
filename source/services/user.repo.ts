import { QueryResult } from "pg";
import { conn } from "../helpers/db.connection";
import { User } from "../interfaces/User.interface";

export const selectUsers = async () => {
    return await conn.query('SELECT * from "UserDB"')
}
export const loginUser = async (user: User): Promise<User | undefined> => {
    const result: QueryResult = await conn.query('SELECT * from "UserDB" where email=$1::text and password =$2::text', [user.email, user.password]);
    console.log(user);

    return result.rows[0]
}
export const registerUser = async (user: User): Promise<boolean> => {
    const result: QueryResult = await conn.query('INSERT INTO "UserDB" (email,password,username) VALUES ($1::text,$2::text,$3::text)', [user.email, user.password, user.username]);
    return result.rowCount == 1
}
export const deleteUser = async (id: number): Promise<User | undefined> => {
    const result: QueryResult = await conn.query('DELETE FROM "UserDB" WHERE id=$1', [id]);
    return result.rows[0]
}