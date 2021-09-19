import * as express from "express";
import { banUser, unBanUser } from "../controllers/admin.controller";
import { Fields } from "../validation-schemas/user.schema";
const router = express.Router()
import { validate } from "../middleware/validateSchema.middleware"
import { clearance, verify } from "../middleware/validateToken.middleware";

router.use(verify(clearance.ADMIN))

router.post(("/ban"), [
    Fields.id,
    Fields.reason
], validate, banUser)

router.post(("/unBan"), [
    Fields.id
], validate, unBanUser)

export const adminRouter = router;
