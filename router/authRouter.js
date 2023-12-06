import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import { login, register } from "../controller/userCtrl.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
