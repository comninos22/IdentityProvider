import { check } from 'express-validator'
export class Fields {
    static id = check("id").notEmpty()
    static reason = check("reason").isString().notEmpty().trim()
    static email = check('email').isEmail().trim()
    static password = check("password").matches(/[a-zA-Z0-9]{4,30}/).trim()
    static username = check('username').isAlphanumeric().trim()
}
