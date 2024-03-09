import { Project } from "../models/project.model.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

const getProjectByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  if (!category.trim()) {
    throw new ApiError(404, "Category is missing.");
  }

  const query = {
    category: { $regex: category, $options: "i" },
  };

  const projects = await Project.find(query);
  if (!projects.length) {
    throw new ApiError(500, "No projects found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully."));
});

export { getProjectByCategory };
