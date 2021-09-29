
import { Request, Response } from "express";
import { setBanned } from "../services/user.repo";
import { User } from "../interfaces/User.interface"


export const unBanUser = async (req: Request, res: Response) => {
    try {
        if (req.body.id == req.payload.id) {
            throw "paradox"
        }
        let user: User
        if (user = await setBanned(req.body.id, false)) {
            return res.json({ message: `User ${user.username} unbanned succesfuly` })
        }
    }
    catch (error) {
        return res.status(470).json({ error })
    }
}

export const banUser = async (req: Request, res: Response) => {
    try {
        if (req.body.id == req.payload.id) {
            throw "cant ban yourself stupid"
        }
        let user: User
        console.log(req.body);

        if (user = await setBanned(req.body.id, true)) {
            return res.json({ message: `User ${user.username} banned succesfuly` })
        }
    }
    catch (error) {
        return res.status(470).json({ error })
    }

}


