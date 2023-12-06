import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

import {
  createBlog,
  deleteBlog,
  getallBlogs,
  getsinglBlogDetails,
  updateBlog,
  userBlog,
} from "../controller/blogCtrl.js";

const router = express.Router();

router.post("/createBlog", requireSignin, createBlog);
router.get("/allBlogs", getallBlogs);
router.get("/SingleblogDetails/:id", getsinglBlogDetails);
router.get("/userBlog/:id", requireSignin, userBlog);
router.put("/updateBlog/:id", requireSignin, updateBlog);
router.delete("/deleteBlog/:id", requireSignin, deleteBlog);

export default router;
