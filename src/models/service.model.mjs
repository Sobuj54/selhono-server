import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: string,
    },
    video: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("Service", serviceSchema);
