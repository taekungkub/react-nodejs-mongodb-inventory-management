import { Router } from "express";
import { ERRORS } from "../helper/errors-message";
import { errorResponse } from "../helper/utils";
const router = Router();

router.get("/", (req, res) => {
  res.json(errorResponse(405, ERRORS.TYPE.NOT_ALLOWED, ERRORS.METHOD_NOT_ALLOW));
});

export default router;
