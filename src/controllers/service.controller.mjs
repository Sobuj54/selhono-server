import { Service } from "../models/service.model.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";
import uploadOnCloudinary from "../utils/cloudinary.mjs";

const createAService = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  console.log(title, description);
  if (!(title.trim() && description.trim())) {
    throw new ApiError(404, "Title and description is required.");
  }

  const videoPath = req.file.path;
  if (!videoPath) {
    throw new ApiError(500, "Video file path missing.");
  }
  const video = await uploadOnCloudinary(videoPath);
  const uploaded = await Service.create({
    title,
    description,
    video: video.url,
  });
  if (!uploaded) {
    throw new ApiError(500, "Service creation failed.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, uploaded, "Service created successfully."));
});

export { createAService };
