
import { Request, Response } from "express";
import { selectUsers, loginUser, registerUser } from "../services/user.repo"; "../services/user.repo"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { JWT_SECRET, BCRYPT_SALT } from "../../keys.json";
import { User } from "../interfaces/User.interface"
import { sha256 } from "crypto-hash"


export const unBanUser = async (req: Request, res: Response) => {
    let user = <User>req.body
    console.log(user);

    user.password = await sha256(user.password)
    if (user = await loginUser(user)) {
    }
    return res.status(401).json({ error: "you are not who you say you are" })
}

export const banUser = async (req: Request, res: Response) => {
    const user = <User>req.body;
    user.password = await sha256(user.password,)
    try {
    } catch (e) {
        return res.status(450).json({ error: "email already exists", e })
    }
}


