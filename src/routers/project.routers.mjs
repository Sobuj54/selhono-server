import { Router } from "express";
import {
  getProjectByCategory,
  getProjectById,
} from "../controllers/project.controller.mjs";

const router = Router();

router.route("/:category").get(getProjectByCategory);
router.route("/id/:projectId").get(getProjectById);

export default router;
