import express from "express";
import { createOrchard } from "../api/orchard";
import { authCheck } from "../middlewares/auth";

const router = express.Router();

/**
 * @openapi
 * /orchard:
 *   put:
 *     summary: Creates a new orchard.
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             login:
 *               properties:
 *                 orchardName:
 *                   type: string
 *                 city:
 *                   type: string
 *                 width:
 *                   type: string
 *                 height:
 *                   type: string
 *           example:
 *             orchardName: MyOrchard
 *             city: Montevideo
 *             width: 60
 *             height: 100
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the recently created orchard
 */
router.put("/", authCheck, createOrchard);

export default router;
