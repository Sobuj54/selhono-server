import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import projectRouter from "./routers/project.routers.mjs";
import blogRouter from "./routers/blog.routes.mjs";

app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/blogs", blogRouter);

export default app;
