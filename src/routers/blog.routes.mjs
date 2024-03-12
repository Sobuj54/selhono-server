import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getLatestBlog,
} from "../controllers/blog.controller.mjs";
import { upload } from "../middlewares/multer.middleware.mjs";

const router = Router();

router.route("/blog/:blogId").get(getBlogById);
router.route("/all").get(getAllBlogs);
router.route("/post").post(upload.single("image"), createBlog);
router.route("/latest").get(getLatestBlog);

export default router;
