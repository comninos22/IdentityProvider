import { NextFunction, Request, RequestHandler, Response, Express } from "express";
import { } from "joi";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../keys.json"
import { User } from "../interfaces/User.interface";
import fs from "mz/fs"
import { sha256 } from "crypto-hash";



export const verify = (clearanceLevel = Clearance.USER) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        {
            try {
                const secret = await fs.readFile("./rsa.pub");
                let authorizationHeader = req.headers.authorization;
                let token, payload: any;
                if (!authorizationHeader.startsWith("Bearer ")) {
                    throw "invalid header"
                }
                token = authorizationHeader.substring(authorizationHeader.indexOf(" ") + 1)
                if (!(payload = jwt.verify(token, secret))) {
                    throw "Token tampering"
                }
                if (payload.ip != req.ip) {
                    throw "CSRF detected"
                }
                if (payload.uag != await sha256(req.headers["user-agent"])) {
                    throw "Token stolen"
                }
                if (payload.clearance < clearanceLevel) {
                    throw "Not authorized"
                }
                req.payload = payload;
                return next()
            } catch (e) {
                console.log(e);
                return res.status(401).json({ error: e })
            }
        }
    }
}
export enum Clearance {
    ADMIN = 9,
    USER = 0,
    OPERATOR = 5
}