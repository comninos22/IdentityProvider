
import { Request, Response } from "express";
import { selectUsers, loginUser, registerUser } from "../services/user.repo";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { JWT_SECRET, BCRYPT_SALT } from "../../keys.json";
import { User } from "../interfaces/User.interface"
import { sha256 } from "crypto-hash"
export const login = async (req: Request, res: Response) => {
    let user = <User>req.body
    console.log(user);
    user.password = await sha256(user.password)
    if (user = await loginUser(user)) {
        const token = signToken(req, user)
        return res.json(token)
    }
    return res.status(401).json({ error: "Invalid credentials" })
}

export const register = async (req: Request, res: Response) => {
    const user = <User>req.body;
    user.password = await sha256(user.password,)
    try {
        let token = await registerUser(user) && signToken(req, await loginUser(user));
        return res.json(token)
    } catch (e) {
        return res.status(450).json({ error: "Email already exists" })
    }
}

function signToken(req: Request, user: User) {
    const options: jwt.SignOptions = {
        algorithm: "HS256",
        audience: "api.beat-thing.com",
        issuer: "auth.beat-thing.com",
        expiresIn: "1h"

    };
    return jwt.sign({
        email: user.email,
        username: user.username,
        id: user.id,
        ip: req.ip,
        clearance: user.userLevel
    }, JWT_SECRET, options);
}

