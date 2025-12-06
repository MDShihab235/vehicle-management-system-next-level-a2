import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.get("/", userControllers.getAllUsers); //Admin only
router.put("/:id", userControllers.updateUser); //Admin or OWN without change role
router.delete("/:id", userControllers.deleteUser); //Admin only

export const userRoutes = router;
