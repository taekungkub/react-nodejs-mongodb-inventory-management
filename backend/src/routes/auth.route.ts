import { Router } from "express";
import * as authController from "@/controllers/auth.controller";
import { onlyAuth } from "@/middleware/passport";
import validateRequestSchema from "@/middleware/validate-request-schema";
import { LoginSchema, RegisterSchema } from "@/validation/auth.schema";

const router = Router();

router.post("/auth/login", validateRequestSchema(LoginSchema), authController.login);
router.post("/auth/register", validateRequestSchema(RegisterSchema), authController.register);
router.get("/auth/profile", onlyAuth, authController.profile);

export default router;
