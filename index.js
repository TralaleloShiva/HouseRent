const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// <-- Fix here: use plural 'bookings' to match frontend requests
app.use("/api/bookings", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
