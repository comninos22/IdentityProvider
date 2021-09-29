
import { Request, Response } from "express";
import { selectUser } from "../services/user.repo";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { JWT_SECRET, BCRYPT_SALT } from "../../keys.json";
import { User } from "../interfaces/User.interface"
import { sha256 } from "crypto-hash"


export const showUserCredentials = async (req: Request, res: Response) => {
    try {
        const id = req.payload.sub
        const user = await selectUser(id);
        res.json(user);
    }
    catch (error) {
        return res.status(470).json({ error })
    }
}

// export const banUser = async (req: Request, res: Response) => {
//     try {
//         if (req.body.id == req.payload.id) {
//             throw "cant ban yourself stupid"
//         }
//         let user: User
//         console.log(req.body);

//         if (user = await setBanned(req.body.id, true)) {
//             return res.json({ message: `User ${user.username} banned succesfuly` })
//         }
//     }
//     catch (error) {
//         return res.status(470).json({ error })
//     }

// }


