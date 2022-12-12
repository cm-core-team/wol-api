// Welcome to the user router
import { Router } from "express";

// Handlers
import { getAllUsers, createUser } from "../controllers/userController.js";

const router: Router = Router();

router.route("/").get(getAllUsers).post(createUser);

export default router;
