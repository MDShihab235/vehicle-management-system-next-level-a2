import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/signup", authControllers.signUp);
router.post("/login", authControllers.loginUser);

export const authRoutes = router;
