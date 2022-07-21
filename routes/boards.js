import express from "express";
import { createProject, updateProject, getArticles } from "../controllers/project.js";
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post("/boards",auth, createProject);
router.put("/boards/:id",auth, updateProject);
router.get("/boards/get",auth,getArticles);
export default router;
