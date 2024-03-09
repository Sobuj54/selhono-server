import mongoose from "mongoose";
import { DB_NAME } from "../constants.mjs";

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );
    console.log(
      `\nmongodb connected! db host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("\nmongodb connection error :", error);
    process.exit(1);
  }
};

export default dbConnect;
