import { check } from 'express-validator'
export const loginSchema = [
    check('email').isEmail().trim(),
    check("password").matches(/[a-zA-Z0-9]{4,30}/).trim()
]
export const registerSchema = [
    check('email').isEmail().trim(),
    check("password").matches(/[a-zA-Z0-9]{4,30}/).trim(),
    check('username').isAlphanumeric().trim()
]

