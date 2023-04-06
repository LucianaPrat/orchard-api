import express from "express";

import auth from "./auth";
import orchard from "./orchard";

const router = express.Router();

router.use("/auth", auth);
router.use("/orchard", orchard);

export default router;
