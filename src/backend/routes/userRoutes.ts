import { Router } from "express";

import { getAllUsers } from "../controllers/userController.js";

const router: Router = Router();

router.route("/").get(getAllUsers);

export default router;
