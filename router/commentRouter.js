import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import {
  blogComment,
  deleteComment,
  getallComments,
  postComment,
  updateComment,
} from "../controller/commentCtrl.js";

const router = express.Router();

router.post("/createComment/:blogid", requireSignin, postComment);
router.get("/allComments", requireSignin, isAdmin, getallComments);
router.get("/blogComment/:blogid", requireSignin, blogComment);
router.put("/updateComment/:id", requireSignin, updateComment);
router.delete("/deleteComment/:id", requireSignin, deleteComment);



export default router;
