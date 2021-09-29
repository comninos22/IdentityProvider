import * as express from "express";
import fs from "mz/fs"
import { disposeEmitNodes } from "typescript";

const router = express.Router()

router.get("/", async (req, res) => {
    const pub = await fs.readFile("./rsa.pub")
    res.json({ pub: pub.toString() });
})

export const wellKnown = router;


