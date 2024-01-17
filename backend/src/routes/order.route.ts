import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { onlyAuth } from "../middleware/passport";

const router = Router();

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrder);
router.post("/orders", onlyAuth);

export default router;
