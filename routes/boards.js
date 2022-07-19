import Router from "express";
import { createProject, updateProject } from "../controllers/project.js";
const router = Router();

router.post("/boards", createProject);
router.put("/boards/:id", updateProject);

export default router;
