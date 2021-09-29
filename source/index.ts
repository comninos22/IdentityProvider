import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./helpers/db.connection";
import { check } from "express-validator";
import { routes } from "./routes/routes";
const app = express()




app.use(
    express.urlencoded(),
    express.json(),
    cors(),
    [check("*").escape().trim()]
)
app.use(routes)
app.use(function (err:any, req:any, res:any, next:any) {
    console.error(err.stack)
    //res.status(500).send('Something broke!')
})
app.listen(process.env.PORT || 4000, () => {
    console.log("aaaeeeaa.... " + 4000);
    try {
        connectDB()

    } catch (e) {
        console.log(e);

    }
});
