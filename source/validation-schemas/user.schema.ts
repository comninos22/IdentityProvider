import { check } from 'express-validator'
export class Fields {
    static id = check("id").notEmpty()
    static reason = check("reason").isString().notEmpty()
    static email = check('email').isEmail()
    static password = check("password").matches(/[a-zA-Z0-9]{4,30}/)
    static username = check('username').isAlphanumeric()
    static fullName = check('fullName').isLength({ min: 6, max: 32 })
    static bio = check("bio").isLength({ min: 16, max: 150 })
    static phone = check("phone").isNumeric().isLength({ min: 10, max: 10 })

}
