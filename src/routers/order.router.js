import express from "express";
const router = express.Router();

import { OrderController } from "../controllers/order.controller.js";

//CREATE Order
router.post("/create", OrderController.create);

//GET ALL Order
router.get("/getAll", OrderController.getAll);

//GET AN Order
router.get("/get/:id", OrderController.get);

//UPDATE AN Order
router.put("/update/:id", OrderController.update);

//DELETE AN Order
router.delete("/delete/:id", OrderController.delete);

export default router;
