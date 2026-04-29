// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);

// // static folder for images
// app.use("/uploads", express.static("uploads"));

// app.listen(5000, () => console.log("Server running on port 5000"));


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

// 🔴 Is wale part ko update karein
app.use(cors({
  origin: "https://aapki-frontend-website.com", // 👈 Yahan apni live frontend ka link dalein
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// static folder for images
app.use("/uploads", express.static("uploads"));

// 🟢 Port ko bhi dynamic banayein live ke liye
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));