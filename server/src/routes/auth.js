import express from "express";
import { login, getProfile, check, updateOnboarded } from "../api/auth";
import { authCheck } from "../middlewares/auth";

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Creates a new user.
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
 *                 email:
 *                   type: string
 *                 pass:
 *                   type: string
 *           example:
 *             email: name@gmail.com
 *             pass: password
 *     responses:
 *       200:
 *         description: Returns an object determining if the login was success.
 */
router.post("/login", login);

/**
 * @openapi
 * /auth/check:
 *   get:
 *     summary: Check if the current user is logged in
 *     consumes:
 *       - application/json
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
 *         description: Returns an object determining if the login was success.
 */
router.get("/check", check);

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     summary: Get the current profile.
 *     consumes:
 *       - application/json
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
 *         description: Returns an object determining if the login was success.
 */
router.get("/profile", authCheck, getProfile);

/**
 * @openapi
 * /auth/profile:
 *   post:
 *     summary: Get the current profile.
 *     consumes:
 *       - application/json
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             onboarded:
 *               properties:
 *                 onboarded:
 *                   type: boolean
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
 *         description: Returns an object determining if the login was success.
 */
router.post("/profile", authCheck, updateOnboarded);

export default router;
