import { QueryResult } from "pg";
import { query } from "../helpers/db.connection";
import { User } from "../interfaces/User.interface";

export const selectUsers = async () => {
    return await query('SELECT * from "UserDB"')
}
export const loginUser = async (user: User): Promise<User | undefined> => {
    const result = await query(
        'SELECT * from "UserDB" where email=$1::text and password =$2::text',
        [user.email, user.password]
    );
    return result.rows[0]
}
export const registerUser = async (user: User): Promise<boolean> => {
    const result = await query('INSERT INTO "UserDB" (email,password,username) VALUES ($1::text,$2::text,$3::text)', [user.email, user.password, user.username]);
    return result.rowCount == 1
}
export const deleteUser = async (id: number): Promise<User | undefined> => {
    const result = await query('DELETE FROM "UserDB" WHERE id=$1', [id]);
    return result.rows[0]
}
export const setBanned = async (id: number, isBanned: boolean): Promise<User | undefined> => {
    console.log(isBanned);

    const result  = await query('update "UserDB" set "isBanned"=$1::boolean where "id"=$2::integer returning *',[isBanned,id])

    return result.rows[0];
}
