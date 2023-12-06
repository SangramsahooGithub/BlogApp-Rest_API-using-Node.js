import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { connectDB } from "./db/db.js";
connectDB();
import authRoute from "./router/authRouter.js";
import blogRoute from "./router/blogRouter.js";
import commentRoute from "./router/commentRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

app.use("/api", authRoute);
app.use("/api", blogRoute);
app.use("/api", commentRoute);

app.listen(process.env.PORT | 5000, (err) => {
  if (err) throw err;
  console.log(`server is running on --- ${process.env.PORT}`);
});
