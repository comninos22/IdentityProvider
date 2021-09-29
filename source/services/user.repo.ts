import { QueryResult } from "pg";
import { query } from "../helpers/db.connection";
import { User } from "../interfaces/User.interface";

export const selectUsers = async () => {
    return await query('SELECT * from "User"')
}

export const selectUser = async (id: number): Promise<User> => {
    const result = await query('SELECT email,"fullName",i.filename,ii.filename,phone,username from "User" as u join "Image" as i on (i.id=u.cover) join "Image" ii on (ii.id=u.profile) where id=$1::integer', [id])
    return result.rows[0];
}

export const findOne = async (user: User): Promise<User> => {
    const result = await query('SELECT password,salt FROM "User" WHERE email=$1::text', [user.email])
    return result.rows[0];
}
export const loginUser = async (user: User): Promise<User | undefined> => {
    const result = await query(
        'SELECT * from "User" where email=$1::text and password =$2::text',
        [user.email, user.password]
    );
    return result.rows[0]
}
export const registerUser = async (user: User): Promise<boolean> => {
    const result = await query('INSERT INTO "User" (email,password,username,fullName,salt,phone) VALUES ($1::text,$2::text,$3::text,4::text,$5::integer,$6::text)',
        [user.email, user.password, user.username, user.fullName, user.salt, user.phone]);
    return result.rowCount == 1
}
export const deleteUser = async (id: number): Promise<User | undefined> => {
    const result = await query('DELETE FROM "User" WHERE id=$1 RETURNING *', [id]);
    return result.rows[0]
}
export const setBanned = async (id: number, isBanned: boolean): Promise<User | undefined> => {
    console.log(isBanned);

    const result = await query('update "User" set "isBanned"=$1::boolean where "id"=$2::integer returning *', [isBanned, id])

    return result.rows[0];
}
