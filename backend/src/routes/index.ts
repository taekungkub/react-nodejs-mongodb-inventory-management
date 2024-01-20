import { Router } from "express";
import { ERRORS } from "../helper/errors-message";
import authRoute from "./auth.route";
import productRoute from "./product.route";
import orderRoute from "./order.route";
import dashboardRoute from "./dashboard.route";

const router = Router();

router.get("/", (req, res) => {
  return res.json({
    statusCode: 405,
    description: ERRORS.METHOD_NOT_ALLOW,
  });
});

router.use(authRoute);
router.use(productRoute);
router.use(orderRoute);
router.use(dashboardRoute);

export default router;
