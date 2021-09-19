import * as express from "express";
import { login, register } from "../controllers/authorization.controller";
import { loginSchema, registerSchema } from "../validation-schemas/user.schema";
const router = express.Router()
import { validate } from "../middleware/validateSchema.middleware"
router.post(("/login"), loginSchema, validate, login)
router.post(("/register"), registerSchema, validate, register)
export const authorizationRouter = router;