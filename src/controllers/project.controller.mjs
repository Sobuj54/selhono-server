import { isValidObjectId } from "mongoose";
import { Project } from "../models/project.model.mjs";
import { ApiError } from "../utils/ApiError.mjs";
import { ApiResponse } from "../utils/ApiResponse.mjs";
import { asyncHandler } from "../utils/asyncHandler.mjs";

const getProjectByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;

  if (!category.trim()) {
    throw new ApiError(404, "Category is missing.");
  }

  // Create a regex pattern that allows any number of spaces
  const regexPattern = category.replace(/ /g, "\\s*");
  const query = {
    category: { $regex: new RegExp(regexPattern, "i") },
  };

  const projectsAggregate = Project.aggregate([{ $match: query }]);

  const options = { page: parseInt(page), limit: parseInt(limit) };
  const projects = await Project.aggregatePaginate(projectsAggregate, options);
  if (!projects) {
    throw new ApiError(500, "No projects found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully."));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  if (!isValidObjectId(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "NO project found .");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully."));
});

export { getProjectByCategory, getProjectById };
