import { Router } from "express";

import { getAllUsers, createUser } from "../controllers/userController";

const router: Router = Router();

router.route("/").get(getAllUsers).post(createUser);

export default router;
