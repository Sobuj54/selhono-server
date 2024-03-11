import { Router } from "express";
import { createBlog } from "../controllers/blog.controller.mjs";
import { upload } from "../middlewares/multer.middleware.mjs";

const router = Router();

router.route("/post").post(upload.single("image"), createBlog);

export default router;
