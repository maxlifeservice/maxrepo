import Payment from "../models/Payment.js";


// ✅ ADD PAYMENT
export const addPayment = async (req, res) => {
  try {
    const {
      name,
      amount,
      bank,
      upiId,
      contactName,
      contactNumber
    } = req.body;

    // ✅ Basic validation
    if (!name || !amount || !upiId) {
      return res.status(400).json({
        msg: "Name, Amount and UPI ID are required"
      });
    }

    const payment = new Payment({
      name,
      amount,
      bank,
      upiId,
      contactName,
      contactNumber,
      screenshot: req.file?.filename || ""
    });

    await payment.save();

    res.status(201).json({
      msg: "Payment saved successfully",
      payment
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message
    });
  }
};


// ✅ GET ALL PAYMENTS
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 });

    res.status(200).json(payments);

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message
    });
  }
};


// ✅ DELETE PAYMENT
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Payment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        msg: "Payment not found"
      });
    }

    res.json({
      msg: "Deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message
    });
  }
};


// ✅ UPDATE PAYMENT (🔥 IMPORTANT)
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
    };

    // agar new screenshot upload hua
    if (req.file) {
      updateData.screenshot = req.file.filename;
    }

    const updated = await Payment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        msg: "Payment not found"
      });
    }

    res.json({
      msg: "Updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server Error",
      error: err.message
    });
  }
};