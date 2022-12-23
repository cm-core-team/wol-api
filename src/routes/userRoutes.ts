// Welcome to the user router
import { Router } from "express";

// Handlers
import { getAllUsers, createUser } from "../controllers/userController";

const router: Router = Router();

// Route handling.
router.route("/").get(getAllUsers).post(createUser);

export default router;
