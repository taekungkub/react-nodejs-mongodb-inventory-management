import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { onlyAuth } from "../middleware/passport";
import validateRequestSchema from "../middleware/validate-request-schema";
import { ProductSchema } from "../validation/product.schema";

const router = Router();

router.get("/products", onlyAuth, productController.getProducts);
router.get("/products/:id", onlyAuth, productController.getProduct);
router.post("/products", onlyAuth, validateRequestSchema(ProductSchema), productController.createProduct);
router.put("/products/:id", onlyAuth, validateRequestSchema(ProductSchema), productController.updateProduct);
router.delete("/products/:id", onlyAuth, productController.deleteProduct);

export default router;
