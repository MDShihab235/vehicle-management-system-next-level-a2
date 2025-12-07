import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/", auth("admin"), userControllers.getAllUsers); //Admin only
router.put("/:id", auth("admin", "customer"), userControllers.updateUser); //Admin or OWN without change role
router.delete("/:id", auth("admin"), userControllers.deleteUser); //Admin only

export const userRoutes = router;
