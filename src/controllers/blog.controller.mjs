import { Blog } from "../models/blog.model.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import uploadOnCloudinary from "../utils/cloudinary.mjs";

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!(title.trim() && description.trim()) && category.trim()) {
    throw new ApiError(404, "Title, category and description are needed.");
  }
  const imageFilePath = req.file.path;
  if (!imageFilePath) {
    throw new ApiError(404, "Image not found in local file.");
  }

  const image = await uploadOnCloudinary(imageFilePath);
  if (!image) {
    throw new ApiError(404, "Image upload failed.");
  }

  const newBlog = await Blog.create({
    title,
    description,
    image: image.url,
    category,
  });
  if (!newBlog) {
    throw new ApiError(500, "Blog creation failed.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newBlog, "Blog created successfully."));
});

const getLatestBlog = asyncHandler(async (req, res) => {
  const latestBlog = await Blog.findOne().sort({ createdAt: -1 });
  if (!latestBlog) {
    throw new ApiError(404, "No latest blog found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, latestBlog, "Fetched latest blog successfully.")
    );
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const latestBlog = await Blog.findOne().sort({ createdAt: -1 });
  if (!latestBlog) {
    throw new ApiError(404, "No latest blog found.");
  }
  const allBlogs = await Blog.find({ _id: { $ne: latestBlog._id } });
  if (!allBlogs.length) {
    throw new ApiError(404, "Blog fetch failed.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allBlogs, "All Blogs fetched successfully."));
});

export { createBlog, getLatestBlog, getAllBlogs };
