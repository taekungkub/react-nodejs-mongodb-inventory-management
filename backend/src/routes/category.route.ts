import { Router } from "express";
import * as cateGoryController from "../controllers/category.controller";
import { onlyAuth } from "../middleware/passport";

const router = Router();

router.get("/category", onlyAuth, cateGoryController.getCategory);
router.post("/category", onlyAuth, cateGoryController.createCategory);
router.put("/category/:id", onlyAuth, cateGoryController.updateCategoryById);
router.delete("/category/:id", onlyAuth, cateGoryController.deleteCategoryById);

export default router;
