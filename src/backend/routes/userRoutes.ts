import { Router } from "express";

import { getAllUsers } from "../controllers/userController";

const router: Router = Router();

router.route("/").get(getAllUsers);
