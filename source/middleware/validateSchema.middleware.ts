import { validationResult } from 'express-validator'

export const validate = (req: Request, res: any, next: any) => {
    const errors = validationResult(req)
    return errors.isEmpty() ? next() : res.status(422).json({
        error: "validation error",
        errors: errors.array({ onlyFirstError: false })
    })
}
