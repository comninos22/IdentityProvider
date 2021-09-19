import { Pool, Client } from 'pg'
import * as keys from "../../keys.json"
const pool = new Pool(keys.PG_USERDB)
pool.connect()
export const conn = pool;
