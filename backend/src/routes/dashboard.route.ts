import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { onlyAuth } from "../middleware/passport";

const router = Router();

router.get("/dashboard", onlyAuth, dashboardController.getDashboard);
router.get("/dashboard/stock", onlyAuth, dashboardController.getDashboardStock);

export default router;
