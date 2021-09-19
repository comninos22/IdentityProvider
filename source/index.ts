import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { authorizationRouter } from "./routes/authorization.route"
import { clearance, verify } from "./middleware/validateToken.middleware";
const app = express()
app.use(express.urlencoded())
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    console.log(req.body);
    next()
})
app.use("/", authorizationRouter);
app.use("/secret", verify(clearance.ADMIN), (req: Request, res: Response) => {
    res.json(req.payload)

})

app.listen(4000, () => {
    console.log("listening.... " + 4000);

})