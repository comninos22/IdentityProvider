import * as express from "express";
import { login, register } from "../controllers/authentication.controller";
import { Fields } from "../validation-schemas/user.schema";
const router = express.Router()
import { validate } from "../middleware/validateSchema.middleware"
router.post(("/login"), [
    Fields.email,
    Fields.password
], validate, login)

router.post(("/register"), [
    Fields.email,
    Fields.password,
    Fields.username
], validate, register)
export const authorizationRouter = router;