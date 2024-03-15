import { Router } from "express";
import { createAService } from "../controllers/service.controller.mjs";
import { upload } from "../middlewares/multer.middleware.mjs";

const router = Router();

router.route("/create").post(upload.single("video"), createAService);

export default router;
