import { Router } from "express";
import { getProjectByCategory } from "../controllers/project.controller.mjs";

const router = Router();

router.route("/:category").get(getProjectByCategory);

export default router;
