import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  bank: String,
  screenshot: String,

  // ✅ NEW FIELDS
  upiId: String,
  contactName: String,
  contactNumber: String,

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);