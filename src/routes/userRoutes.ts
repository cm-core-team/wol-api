// Welcome to the user router
import { Router } from "express";

// Handlers
import { getAllUsers, createUser } from "../controllers/userController";

import { signup } from "../controllers/authController";

const router: Router = Router();

// Route handling.
router.route("/").get(getAllUsers).post(signup);

export default router;
