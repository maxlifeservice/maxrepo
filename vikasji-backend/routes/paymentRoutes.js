import express from "express";
import {
  addPayment,
  getPayments,
  deletePayment
} from "../controllers/paymentController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/add", upload.single("screenshot"), addPayment);
router.get("/all", getPayments);          // ✅ GET
router.delete("/delete/:id", deletePayment); // ✅ DELETE

export default router;