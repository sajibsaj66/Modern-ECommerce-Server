import express from "express";
import auth from "../../middlewares/auth";
import { orderController } from "../controllers/order.controller";
const router = express.Router();

// products count
router.post('/order', orderController)


export default router;