import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";
import { signup } from "../controllers/authController.js";
const router = Router();
router.route("/").get(getAllUsers).post(signup);
export default router;
