import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  editTask,
} from "../api/tasks";

const router = express.Router();

/**
 * @openapi
 * /a:
 *   get:
 *     description: Welcome to swagger-jsdocccccccccccc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", editTask);

export default router;
