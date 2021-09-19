import { NextFunction, Request, Response } from 'express'
import { Pool, Client, QueryResult } from 'pg'
import * as keys from "../../keys.json"
let pool: Pool = null
export const connectDB = () => {
        try {
            pool = new Pool(keys.PG_USERDB)
            pool.connect()
            console.log("kakakak");
            pool.on("connect", () => {
                console.log("DB connected")
            })
        } catch (e) {
            console.log(e);
        }
}
export const query = async (q: string, p?: any[]): Promise<QueryResult> => {
    return await pool.query(q, p)
}
