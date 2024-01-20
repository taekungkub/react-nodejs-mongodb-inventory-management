import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { onlyAuth } from "../middleware/passport";
import onlyRoles from "../middleware/onlyRoles";

const router = Router();

router.get("/users", onlyAuth, userController.getUsers);
router.post("/users", onlyAuth, userController.createUser);
router.put("/users/:id", onlyAuth, onlyRoles(["admin"]), userController.updateUserById);
router.delete("/users/:id", onlyAuth, onlyRoles(["admin"]), userController.deleteUserById);

export default router;
