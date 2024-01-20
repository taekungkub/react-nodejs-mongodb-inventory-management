import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { onlyAuth } from "../middleware/passport";
import onlyRoles from "../middleware/onlyRoles";

const router = Router();

router.get("/users", onlyAuth, onlyRoles(["admin"]), userController.getUsers);
router.post("/users", onlyAuth, userController.createUser);
router.put("/users/:id", onlyAuth, userController.updateUserById);
router.delete("/users/:id", onlyAuth, userController.deleteUserById);

export default router;
