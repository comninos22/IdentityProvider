import * as express from "express";
import { showUserCredentials } from "../controllers/user.controller";
import { Fields } from "../validation-schemas/user.schema";
const router = express.Router()
import { validate } from "../middleware/validateSchema.middleware"
import { Clearance, verify } from "../middleware/validateToken.middleware";

router.use(verify(Clearance.USER))

router.get("/", showUserCredentials)

router.patch("/email", [
    Fields.email,
], validate)

router.patch("/password", [
    Fields.password,
], validate)

router.patch("/image", [

])

export const userRouter = router;
