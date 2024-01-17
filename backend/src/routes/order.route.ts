import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { onlyAuth } from "../middleware/passport";

const router = Router();

router.get("/orders", onlyAuth, orderController.getAllOrders);
router.get("/orders/:id", onlyAuth, orderController.getOrder);
router.post("/orders", onlyAuth, orderController.createOrders);
router.put("/orders/:id/status", onlyAuth, orderController.updateOrderStatus);

export default router;
