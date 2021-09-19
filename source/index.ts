import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { authorizationRouter } from "./routes/authentication.route"
import { clearance, verify } from "./middleware/validateToken.middleware";
import { connectDB } from "./helpers/db.connection";
import { adminRouter } from "./routes/admin.route";
const app = express()
app.use(express.urlencoded())
app.use(express.json());
app.use(cors())

app.use("/secret", verify(clearance.ADMIN), (req: Request, res: Response) => {
    res.json(req.payload)

})
app.use("/", authorizationRouter);
app.use("/",adminRouter)
app.listen(4000, () => {
    console.log("listening.... " + 4000);
    connectDB()
})