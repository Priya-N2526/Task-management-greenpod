import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getTasks, createTask } from "../controllers/taskController.js";

const router = express.Router();
router.get("/", auth, getTasks);
router.post("/", auth, createTask);

export default router;
