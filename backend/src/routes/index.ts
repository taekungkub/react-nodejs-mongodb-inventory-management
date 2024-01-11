import { Router } from "express";
import { ERRORS } from "../helper/errors-message";
const router = Router();

router.get("/", (req, res) => {
  return res.json({
    statusCode: 405,
    description: ERRORS.METHOD_NOT_ALLOW,
  });
});

export default router;
