import app from "./app.mjs";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.mjs";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

dbConnect()
  .then(() => {
    app.on("error", (err) => {
      console.log("err:", err);
      throw err;
    });
    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed !", err);
  });
