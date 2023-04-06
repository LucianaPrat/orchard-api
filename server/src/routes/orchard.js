import express from "express";
import { createOrchard } from "../api/orchard";

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
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 width:
 *                   type: string
 *                 height:
 *                   type: string
 *           example:
 *             name: MyOrchard
 *             city: Montevideo
 *             width: 60
 *             height: 100
 *     responses:
 *       200:
 *         description: Returns the recently created orchard
 */
router.put("/", createOrchard);

export default router;
