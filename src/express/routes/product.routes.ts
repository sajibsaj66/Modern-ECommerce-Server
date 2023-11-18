import express from "express";
import { productsCountController } from "../controllers/products.controller";
const router = express.Router();

// products count
router.get('/products-count', productsCountController)


export default router;