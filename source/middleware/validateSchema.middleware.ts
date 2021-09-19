import { check, Schema, ValidationChain, validationResult } from 'express-validator'
import Joi from "joi"
import { NextFunction, Response } from "express"
// validation/validateMiddleware



// DRY our code with higher order function
export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(422).json({
        error: "validation error",
    })
}
