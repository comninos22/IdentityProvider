
import { Request, Response } from "express";
import { selectUsers, loginUser, registerUser, findOne } from "../services/user.repo";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { JWT_SECRET, BCRYPT_SALT } from "../../keys.json";
import { User } from "../interfaces/User.interface"
import { sha256 } from "crypto-hash"
import * as crypto from "crypto"
import fs from "mz/fs"
export const login = async (req: Request, res: Response) => {
    try {
        let user = <User>req.body
        let candidate: User;
        console.log(user);
        console.log(candidate);
        if (candidate = await findOne(user)) {


            user.password = await sha256(candidate.salt + user.password)

            if (user = await loginUser(user)) {
                const token = await signToken(req, user)
                return res.json(token)
            }
        }
        return res.status(401).json({ error: "Invalid credentials" })
    } catch (e) {
        console.log(e);

    }

}

export const register = async (req: Request, res: Response) => {

    try {
        const user = <User>req.body;
        user.salt = Math.floor(Math.random() * 10 ** 6);
        user.password = await sha256(user.salt + user.password)
        let token = await registerUser(user) && await signToken(req, await loginUser(user));
        return res.json(token)
    } catch (e) {
        return res.status(450).json({ error: "Email already exists" })
    }
}

async function signToken(req: Request, user: User) {
    try {
        const secret = await fs.readFile("./rsa")
        const options: jwt.SignOptions = {
            algorithm: "RS256",
            audience: "api.beat-thing.com",
            issuer: "auth.beat-thing.com",
            expiresIn: "1h",
            subject: user.id.toString(),

        };
        const payload = {
            email: user.email,
            username: user.username,
            ip: req.ip,
            clearance: user.userLevel,
            emailVerified: user.emailVerified,
            uag: await sha256(req.headers["user-agent"])
        }
        return jwt.sign(payload, secret, options);
    } catch (e) {
        console.log(e)
    }


}

