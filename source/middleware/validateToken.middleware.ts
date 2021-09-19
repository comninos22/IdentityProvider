import { NextFunction, Request, RequestHandler, Response, Express } from "express";
import { } from "joi";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../keys.json"
import { User } from "../interfaces/User.interface";

export const verify = (clearanceLevel = clearance.USER) => {
    return (req: Request, res: Response, next: NextFunction) => {
        {
            try {
                let authorizationHeader = req.headers.authorization;
                let token, payload: any;
                if (!authorizationHeader.startsWith("Bearer ")) {
                    throw "invalid header"
                }
                token = authorizationHeader.substring(authorizationHeader.indexOf(" ") + 1)
                if (!(payload = jwt.verify(token, JWT_SECRET))) {
                    throw "token tampering"
                }
                if (payload.ip != req.ip) {
                    throw "CSRF detected"
                }
                if (payload.clearance < clearanceLevel) {
                    throw "not authorized"
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
export enum clearance {
    ADMIN = 9,
    USER = 0,
    OPERATOR = 5
}