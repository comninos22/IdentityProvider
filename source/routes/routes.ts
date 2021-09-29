import express from "express";
import { Clearance, verify } from "../middleware/validateToken.middleware";
import { adminRouter } from "./admin.route";
import { authorizationRouter } from "./authentication.route";
import { userRouter } from "./user.route";
import { wellKnown } from "./wellknown.route";

const router = express.Router()
router.use("/", authorizationRouter);
router.use("/.wellknown", wellKnown)
router.use("/me", verify(Clearance.USER), userRouter)
router.use("/admin", adminRouter)

export const routes = router;